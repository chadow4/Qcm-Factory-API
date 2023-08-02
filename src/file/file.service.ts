import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {FileCreateDto, FileDeleteDto} from "./file.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {ModuleEntity} from "../module/module.entity";
import {Repository} from "typeorm";
import {FileEntity} from "./file.entity";
import {SectionEntity} from "../section/section.entity";

@Injectable()
export class FileService {

    constructor(
        @InjectRepository(ModuleEntity)
        private readonly moduleRepository: Repository<ModuleEntity>,
        @InjectRepository(FileEntity)
        private readonly fileRepository: Repository<FileEntity>,
        @InjectRepository(SectionEntity)
        private readonly sectionRepository: Repository<SectionEntity>
    ) {
    }

    async createFile(file: FileCreateDto, sessionId: number) {
        if (!file.name || !file.path || !file.type || !file.sectionId) {
            throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
        }
        const section = await this.sectionRepository.findOne({
            where: {id: file.sectionId},
            relations: ["module", "module.author"]
        });

        if (!section) throw new HttpException("section not found", HttpStatus.NOT_FOUND);
        if (section.module.author.id != sessionId) throw new HttpException("You are not the author of this module", HttpStatus.BAD_REQUEST);

        const newFile = await this.fileRepository.create({
            name: file.name,
            path: file.path,
            type: file.type,
            size: file.size,
            section: section
        });

        try {
            await this.fileRepository.save(newFile);
        } catch (error) {
            throw new HttpException("Error creating file", HttpStatus.BAD_REQUEST);
        }

    }

    async deleteFile(fileId: number, sessionId: number) {
        if (!fileId) {
            throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
        }
        const file = await this.fileRepository.findOne({
            where: {id: fileId},
            relations: ["section", "section.module", "section.module.author"]
        });
        if (!file) throw new HttpException("File not found", HttpStatus.NOT_FOUND);
        if (file.section.module.author.id != sessionId) throw new HttpException("You are not the author of this module", HttpStatus.UNAUTHORIZED);

        try {
            await this.fileRepository.delete(fileId);
        } catch (error) {
            throw new HttpException("Error removing file", HttpStatus.BAD_REQUEST);
        }
    }
}
