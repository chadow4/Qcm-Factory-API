import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionEntity} from "../question/question.entity";
import {Repository} from "typeorm";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {UserEntity} from "../user/user.entity";
import {ModuleEntity} from "./module.entity";
import {toModuleDto} from "../shared/mapper";
import {ModuleCreateDto, ModuleDto} from "./module.dto";

@Injectable()
export class ModuleService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
        @InjectRepository(QuestionnaireEntity)
        private readonly questionnaireRepository: Repository<QuestionnaireEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ModuleEntity)
        private readonly moduleRepository: Repository<ModuleEntity>
    ) {
    }

    async getAllModules(): Promise<ModuleDto[]> {
        const modules = await this.moduleRepository.find();
        return modules.map(module => toModuleDto(module));
    }

    async getModuleById(id: number): Promise<ModuleDto> {
        const module = await this.moduleRepository.findOne(
            {where: {id}, relations: ["author", "questionnaire"]});
        if (!module) throw new HttpException("Module not found", HttpStatus.NOT_FOUND);
        return toModuleDto(module);
    }

    async createModule(moduleCreateDto: ModuleCreateDto, sessionId) {
        if (!moduleCreateDto.name) {
            throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
        }
        const author = await this.userRepository.findOne({where: {id: sessionId}});
        if (!author) throw new HttpException("Author not found", HttpStatus.NOT_FOUND);
        const newModule = await this.moduleRepository.create({
            name: moduleCreateDto.name,
            author: author,
        });
        try {
            await this.moduleRepository.save(newModule);
        } catch (error) {
            throw new HttpException("Module already exists", HttpStatus.BAD_REQUEST);
        }
    }

}

