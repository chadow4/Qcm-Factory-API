import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {ResourceService} from "./ressource.service";
import {ResourceCreateDto} from "./resource.dto";
import {RolesGuard} from "../auth/roles.guard";
import {AuthGuard} from "@nestjs/passport";
import {HasRoles} from "../auth/has-roles.decorator";
import {Role} from "../auth/interface/role.enum";

@Controller('resource')
export class ResourceController {

    constructor(private readonly resourceService: ResourceService) {
    }

    @Post()
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    async createResource(@Body() resource: ResourceCreateDto, @Request() req) {
        try {
            await this.resourceService.createResource(resource, req.user.id);
            return {message: "Resource created"};
        } catch (error) {
            throw error;
        }
    }

    @Get(":id")
    @UseGuards(AuthGuard("jwt"))
    async getResourceById(@Param("id") id: number) {
        try {
            return await this.resourceService.getResourceById(id);
        } catch (error) {
            throw error;
        }
    }


}
