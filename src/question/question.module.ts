import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionEntity } from "./question.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionEntity])],
  controllers: [],
  providers: [],
})
export class QuestionModule {}
