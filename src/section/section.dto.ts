import { ModuleEntity } from "../module/module.entity";
import {FileEntity} from "../file/file.entity";


export class SectionCreateDto {
    name: string;
    moduleId: number
}
export class SectionDto {
    id: number;
    name: string;
    module?: ModuleEntity;
    file?: FileEntity[];
    section?: SectionDto[];
}