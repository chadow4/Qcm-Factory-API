import {Body, Controller, Get, Param, Post, Request, UseGuards} from '@nestjs/common';
import {ApiResponse, ApiTags} from "@nestjs/swagger";
import {ResultService} from "./result.service";
import {ResultCreateDto, ResultDto, ResultPartialDto, ResultPartialGlobalDto} from "./result.dto";
import {HasRoles} from "../auth/has-roles.decorator";
import {Role} from "../auth/interface/role.enum";
import {AuthGuard} from "@nestjs/passport";
import {RolesGuard} from "../auth/roles.guard";


@ApiTags('Result')
@Controller('result')
export class ResultController {
    constructor(private readonly resultService: ResultService) {
    }

    @Get('global/:idQuestionnaire')
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @ApiResponse({status: 200, description: 'List of Result For Questionnaire', type: ResultPartialGlobalDto, isArray: true})
    async showAllResultsForQuestionnaire(@Param('idQuestionnaire') idQuestionnaire: number) {
        try {
            return await this.resultService.getAllResultsForQuestionnaire(idQuestionnaire);
        } catch (error) {
            throw error;
        }
    }

    @Get(':idQuestionnaire')
    @UseGuards(AuthGuard("jwt"))
    @ApiResponse({status: 200, description: 'Result for Student', type: ResultPartialDto})
    async showResultForQuestionnaire(@Param('idQuestionnaire') idQuestionnaire: number, @Request() req) {
        {
            try {
                return await this.resultService.getResultForQuestionnaire(idQuestionnaire, req.user.id);
            } catch (error) {
                throw error;
            }
        }
    }

    @Post()
    @UseGuards(AuthGuard("jwt"))
    @ApiResponse({status: 200, description: 'Result created', type: ResultPartialDto})
    async createResult(@Request() req, @Body() resultCreateDto: ResultCreateDto) {
        try {
            await this.resultService.createResult(resultCreateDto, req.user.id);
            return {message: "Result created"};
        } catch (error) {
            throw error;
        }
    }

}
