import { Body, Controller, Get, Param, Post, Put, Request, UseGuards } from "@nestjs/common";
import { QuestionnaireService } from "./questionnaire.service";
import {QuestionnaireCreateDto, QuestionnaireDto, QuestionnairePartialDto} from "./questionnaire.dto";
import { QuestionCreateDto } from "../question/question.dto";
import { AuthGuard } from "@nestjs/passport";
import { HasRoles } from "../auth/has-roles.decorator";
import { Role } from "../auth/interface/role.enum";
import { RolesGuard } from "../auth/roles.guard";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags('Questionnaire')
@Controller("questionnaire")
export class QuestionnaireController {
    constructor(private readonly questionnaireService: QuestionnaireService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'List of all questionnaires' , type: QuestionnairePartialDto, isArray: true})
    async showAllQuestionnaires() {
        try {
            return await this.questionnaireService.getAllQuestionnaires();
        } catch (error) {
            return { message: error.message };
        }
    }

    @Get(":id")
    @ApiResponse({ status: 200, description: 'Information of the questionnaire with the specified ID', type: QuestionnaireDto })
    async getQuestionnaireById(@Param("id") id: number) {
        try {
            return await this.questionnaireService.getQuestionnaireById(id);
        } catch (error) {
            return { message: error.message };
        }
    }

    @Put(":id")
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @ApiResponse({ status: 200, description: 'Change the state of the questionnaire' })
    async changeState(@Param("id") id: number, @Request() req) {
        try {
            const state = await this.questionnaireService.changeState(id, req.user.id);
            return { message: "Questionnaire state changed, Opened: " + state };
        } catch (error) {
            return { message: error.message };
        }
    }

    @Post()
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @ApiResponse({ status: 201, description: 'Create a new questionnaire' })
    async createQuestionnaire(@Body() questionnaireCreateDto: QuestionnaireCreateDto, @Request() req) {
        try {
            await this.questionnaireService.createQuestionnaire(questionnaireCreateDto, req.user.id);
            return { message: "Questionnaire created" };
        } catch (error) {
            return { message: error.message };
        }
    }

    @Post("question")
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @ApiResponse({ status: 201, description: 'Create a new question' })
    async createQuestion(@Body() questionCreateDto: QuestionCreateDto, @Request() req) {
        try {
            await this.questionnaireService.createQuestion(questionCreateDto, req.user.id);
            return { message: "Question created" };
        } catch (error) {
            return { message: error.message };
        }
    }
}
