import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OptionEntity } from "../option/option.entity";
import { QuestionnaireEntity } from "./questionnaire.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity])],
  controllers: [],
  providers: [],
})
export class QuestionnaireModule {}
