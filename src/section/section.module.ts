import { Module } from '@nestjs/common';
import { SectionService } from './section.service';
import { SectionController } from './section.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { SectionEntity } from "./section.entity";
import { ModuleEntity } from "../module/module.entity";

@Module({
  imports: [TypeOrmModule.forFeature([SectionEntity,ModuleEntity])],
  providers: [SectionService],
  controllers: [SectionController]
})
export class SectionModule {}
