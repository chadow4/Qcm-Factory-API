import {SectionDto} from "../section/section.dto";

export class FileCreateDto {
    name: string;
    path: string;
    type: string;
    size: number;
    sectionId: number;
}

export class FileDto {
    id: number;
    name: string;
    path: string;
    type: string;
    size: number;
    section?: SectionDto;
}

export class FileDeleteDto {
    id: number;
}