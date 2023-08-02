import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {ResourceEntity} from "./ressource.entity";
import {Repository} from "typeorm";
import {SectionEntity} from "../section/section.entity";
import {ResourceCreateDto, ResourceDto} from "./resource.dto";
import {toResourceDto} from "../shared/mapper";

@Injectable()
export class ResourceService {
    constructor(
        @InjectRepository(ResourceEntity)
        private resourceRepository: Repository<ResourceEntity>,
        @InjectRepository(SectionEntity)
        private sectionRepository: Repository<SectionEntity>
    ) {
    }


    async createResource(resourceCreateDto: ResourceCreateDto, sessionId: number) {
        if (!resourceCreateDto.name || !resourceCreateDto.content || !resourceCreateDto.sectionId) {
            throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
        }
        const section = await this.sectionRepository.findOne({
            where: {id: resourceCreateDto.sectionId},
            relations: ["module", "module.author"]
        });

        if (!section) throw new HttpException("Section not found", HttpStatus.NOT_FOUND);

        if (section.module.author.id != sessionId) throw new HttpException("You are not the author of this module", HttpStatus.BAD_REQUEST);

        const newResource = await this.resourceRepository.create({
            name: resourceCreateDto.name,
            content: resourceCreateDto.content,
            section: section
        });

        try {
            await this.resourceRepository.save(newResource);
        } catch (error) {
            throw new HttpException("Error creating Ressource", HttpStatus.BAD_REQUEST);
        }
    }

    async getResourceById(id: number): Promise<ResourceDto> {
        const resource = await this.resourceRepository.findOne(
            {where: {id}});
        if (!resource) throw new HttpException("Resource not found", HttpStatus.NOT_FOUND);
        return toResourceDto(resource);
    }
}
