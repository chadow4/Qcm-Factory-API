import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { SectionEntity } from "./section.entity";
import { ModuleEntity } from "../module/module.entity";
import { SectionCreateDto } from "./section.dto";

@Injectable()
export class SectionService {

  constructor(
    @InjectRepository(SectionEntity)
    private readonly sectionRepository: Repository<SectionEntity>,
    @InjectRepository(ModuleEntity)
    private readonly moduleRepository: Repository<ModuleEntity>
  ) {
  }

  async createSection(sectionCreateDto: SectionCreateDto, sessionId) {
    if (!sectionCreateDto.name || !sectionCreateDto.moduleId) {
      throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
    }
    const module = await this.moduleRepository.findOne({
      where: { id: sectionCreateDto.moduleId },
      relations: ["author"]
    });
    if (!module) throw new HttpException("module not found", HttpStatus.NOT_FOUND);

    if (module.author.id != sessionId) throw new HttpException("You are not the author of this module", HttpStatus.UNAUTHORIZED);

    const newSection = await this.sectionRepository.create({
      name: sectionCreateDto.name,
      module: module
    });
    try {
      await this.sectionRepository.save(newSection);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}

