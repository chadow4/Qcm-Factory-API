import {SectionDto} from "../section/section.dto";

export interface ResourceCreateDto {
    name: string;
    content: string;
    sectionId: number;
}

export interface ResourceDto {
    id: number;
    name: string;
    content: string;
    section : SectionDto;
}