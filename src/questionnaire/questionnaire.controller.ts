import { Body, Controller, Get, Param, Post, Request, UseGuards } from "@nestjs/common";
import { QuestionnaireService } from "./questionnaire.service";
import { QuestionnaireCreateDto } from "./questionnaire.dto";
import { QuestionCreateDto } from "../question/question.dto";
import { AuthGuard } from "@nestjs/passport";

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

  @Post()
  @UseGuards(AuthGuard("jwt"))
  async createQuestionnaire(@Body() questionnaireCreateDto: QuestionnaireCreateDto,@Request() req) {
    try {
      return await this.questionnaireService.createQuestionnaire(questionnaireCreateDto,req.user.id);
    } catch (error) {
      return {
        message: error.message
      };
    }
  }

  @Post("question")
  async createQuestion(@Body() questionCreateDto: QuestionCreateDto) {
    try {
      return await this.questionnaireService.createQuestion(questionCreateDto);
    } catch (error) {
      return {
        message: error.message
      };
    }
  }
}
