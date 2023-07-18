import { Module } from '@nestjs/common';
import { ModuleController } from './module.controller';
import { ModuleService } from './module.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {QuestionEntity} from "../question/question.entity";
import {UserEntity} from "../user/user.entity";
import {ModuleEntity} from "./module.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity, QuestionEntity,UserEntity,ModuleEntity])],
  controllers: [ModuleController],
  providers: [ModuleService]
})
export class ModuleModule {}
