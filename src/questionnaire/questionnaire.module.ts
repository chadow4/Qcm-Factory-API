import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { QuestionnaireEntity } from "./questionnaire.entity";
import { UserEntity } from "../user/user.entity";
import { QuestionnaireService } from "./questionnaire.service";
import { QuestionnaireController } from "./questionnaire.controller";
import { QuestionEntity } from "../question/question.entity";
import { AuthModule } from "../auth/auth.module";
import {ModuleEntity} from "../module/module.entity";

@Module({
  imports: [TypeOrmModule.forFeature([QuestionnaireEntity, QuestionEntity,UserEntity,ModuleEntity])],
  controllers: [QuestionnaireController],
  providers: [QuestionnaireService]
})
export class QuestionnaireModule {
}
