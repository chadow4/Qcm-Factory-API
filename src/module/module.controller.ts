import {Body, Controller, Get, Param, Post, Query, Request, UseGuards} from '@nestjs/common';
import {ModuleService} from "./module.service";
import {ModuleCreateDto, ModuleDto} from "./module.dto";
import {AuthGuard} from "@nestjs/passport";
import {HasRoles} from "../auth/has-roles.decorator";
import {Role} from "../auth/interface/role.enum";
import {RolesGuard} from "../auth/roles.guard";

@Controller('module')
export class ModuleController {
    constructor(private moduleService: ModuleService) {
    }

    @Get()
    @UseGuards(AuthGuard("jwt"))
    async getAllModules() {
        try {
            return await this.moduleService.getAllModules();
        } catch (error) {
            throw error;
        }
    }

    @Get('/search')
    @UseGuards(AuthGuard("jwt"))
    async findAllByKeyword(@Query('keyword') keyword: string): Promise<ModuleDto[]> {
        try {
            return await this.moduleService.findAllByKeyword(keyword);
        } catch (error) {
            throw error;
        }
    }


    @Get(":id")
    @UseGuards(AuthGuard("jwt"))
    async getModuleById(@Param("id") id: number) {
        try {
            return await this.moduleService.getModuleById(id);
        } catch (error) {
            throw error;
        }
    }


    @Post()
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    async createModule(@Body() module: ModuleCreateDto, @Request() req) {
        try {
            await this.moduleService.createModule(module, req.user.id);
            return {message: "Module created"};
        } catch (error) {
            throw error;
        }
    }
}
