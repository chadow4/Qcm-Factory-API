import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiResponse} from "@nestjs/swagger";
import {QuestionnaireDto} from "./questionnaire/questionnaire.dto";

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Name of the API'})
  getHello(): string {
    return this.appService.getHello();
  }
}
