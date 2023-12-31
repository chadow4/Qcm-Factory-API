import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { UserEntity } from "./user/user.entity";
import { QuestionnaireModule } from './questionnaire/questionnaire.module';
import { QuestionModule } from './question/question.module';
import { QuestionnaireEntity } from "./questionnaire/questionnaire.entity";
import { QuestionEntity } from "./question/question.entity";
import { ResultModule } from './result/result.module';
import {ResultEntity} from "./result/result.entity";
import { ModuleModule } from './module/module.module';
import {ModuleEntity} from "./module/module.entity";
import {SectionModule} from "./section/section.module";
import {SectionEntity} from "./section/section.entity";
import { FileModule } from './file/file.module';
import {FileEntity} from "./file/file.entity";
import {ResourceModule} from "./resource/ressource.module";
import {ResourceEntity} from "./resource/ressource.entity";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "qcmfactoryprod",
    entities: [UserEntity,QuestionnaireEntity,QuestionEntity,ResultEntity,ModuleEntity,SectionEntity,FileEntity,ResourceEntity], // adding entities
    synchronize: true
  }),UserModule,AuthModule, QuestionnaireModule, QuestionModule, ResultModule, ModuleModule,SectionModule, FileModule, ResourceModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
