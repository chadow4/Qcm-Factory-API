import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OptionEntity } from "../option/option.entity";
import { QuestionEntity } from "./question.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity,QuestionEntity])],
  controllers: [],
  providers: [],
})
export class QuestionModule {}
