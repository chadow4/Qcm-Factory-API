import {Module} from '@nestjs/common';
import {FileController} from './file.controller';
import {FileService} from './file.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {ModuleEntity} from "../module/module.entity";
import {FileEntity} from "./file.entity";
import {SectionEntity} from "../section/section.entity";

@Module({
    imports: [TypeOrmModule.forFeature([ModuleEntity, FileEntity,SectionEntity])],
    controllers: [FileController],
    providers: [FileService]
})
export class FileModule {
}
