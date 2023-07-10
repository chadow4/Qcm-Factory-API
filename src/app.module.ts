import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { UserEntity } from "./user/user.entity";

@Module({
  imports: [ConfigModule.forRoot(), TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "qcmfactory",
    entities: [UserEntity], // adding entities
    synchronize: true
  }),UserModule,AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
