import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OptionEntity } from "./option.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OptionEntity])],
  controllers: [],
  providers: [],
})
export class OptionModule {
}
