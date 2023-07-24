import { ModuleEntity } from "../module/module.entity";


export class SectionCreateDto {
    name: string;
    moduleId: number
}
export class SectionDto {
    id: number;
    name: string;
    module?: ModuleEntity;
}