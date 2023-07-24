import {Body, Controller, Post, Request, UseGuards} from '@nestjs/common';
import {SectionService} from "./section.service";
import {HasRoles} from "../auth/has-roles.decorator";
import {Role} from "../auth/interface/role.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/roles.guard";
import {ModuleCreateDto} from "../module/module.dto";
import {SectionCreateDto} from "./section.dto";

@Controller('section')
export class SectionController {
    constructor(private readonly sectionService: SectionService) {
    }

    @Post()
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    async createSection(@Body() section: SectionCreateDto, @Request() req) {
        try {
            await this.sectionService.createSection(section, req.user.id);
            return {message: "Section created"};
        } catch (error) {
            throw error;
        }
    }
}
