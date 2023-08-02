import {Module} from '@nestjs/common';
import {ResourceService} from './ressource.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {SectionEntity} from "../section/section.entity";
import {ModuleEntity} from "../module/module.entity";
import {ResourceEntity} from "./ressource.entity";
import {ResourceController} from "./ressource.controller";

@Module({
    imports: [TypeOrmModule.forFeature([SectionEntity, ModuleEntity, ResourceEntity])],
    providers: [ResourceService],
    controllers: [ResourceController]
})
export class ResourceModule {
}
