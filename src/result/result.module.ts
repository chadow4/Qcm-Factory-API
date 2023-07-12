import { Module } from '@nestjs/common';
import { ResultService } from './result.service';
import { ResultController } from './result.controller';
import {ResultEntity} from "./result.entity";
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {UserEntity} from "../user/user.entity";
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity,UserEntity,ResultEntity])],
  providers: [ResultService],
  controllers: [ResultController]
})
export class ResultModule {}
