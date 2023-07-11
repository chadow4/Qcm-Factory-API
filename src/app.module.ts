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

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "qcmfactory",
    entities: [UserEntity,QuestionnaireEntity,QuestionEntity], // adding entities
    synchronize: true
  }),UserModule,AuthModule, QuestionnaireModule, QuestionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
