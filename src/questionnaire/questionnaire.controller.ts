import {Body, Controller, Get, Param, Post, Put, Request, UseGuards} from "@nestjs/common";
import {QuestionnaireService} from "./questionnaire.service";
import {QuestionnaireCreateDto} from "./questionnaire.dto";
import {QuestionCreateDto} from "../question/question.dto";
import {AuthGuard} from "@nestjs/passport";
import {HasRoles} from "../auth/has-roles.decorator";
import {Role} from "../auth/interface/role.enum";
import {RolesGuard} from "../auth/roles.guard";

@Controller("questionnaire")
export class QuestionnaireController {

    constructor(private readonly questionnaireService: QuestionnaireService) {
    }

    @Get()
    async showAllQuestionnaires() {
        try {
            return await this.questionnaireService.getAllQuestionnaires();
        } catch (error) {
            return {
                message: error.message
            };
        }
    }

    @Get(":id")
    async getQuestionnaireById(@Param("id") id: number) {
        try {
            return await this.questionnaireService.getQuestionnaireById(id);
        } catch (error) {
            return {
                message: error.message
            };
        }
    }

    @Put(":id")
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"),RolesGuard)
    async changeState(@Param("id") id: number, @Request() req) {
        try {
            const state = await this.questionnaireService.changeState(id, req.user.id);
            return {
                message: "Questionnaire state changed, Opened: " + state,
            }
        } catch (error) {
            return {
                message: error.message,
            };
        }
    }

    @Post()
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"),RolesGuard)
    async createQuestionnaire(@Body() questionnaireCreateDto: QuestionnaireCreateDto, @Request() req) {
        try {
            await this.questionnaireService.createQuestionnaire(questionnaireCreateDto, req.user.id);
            return {
                message: "Questionnaire created",
            }
        } catch (error) {
            return {
                message: error.message,
            };
        }
    }

    @Post("question")
    @HasRoles(Role.Prof)
    @UseGuards(AuthGuard("jwt"),RolesGuard)
    async createQuestion(@Body() questionCreateDto: QuestionCreateDto, @Request() req) {
        try {
            await this.questionnaireService.createQuestion(questionCreateDto, req.user.id);
            return {
                message: "Question created",
            }
        } catch (error) {
            return {
                message: error.message,
            };
        }
    }
}
