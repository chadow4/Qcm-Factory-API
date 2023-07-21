import {Repository} from "typeorm";
import {QuestionEntity} from "../question/question.entity";
import {QuestionnaireEntity} from "./questionnaire.entity";
import {QuestionnaireCreateDto, QuestionnaireDto} from "./questionnaire.dto";
import {toQuestionnaireDto, toQuestionnaireWithoutResponses} from "../shared/mapper";
import {QuestionCreateDto} from "../question/question.dto";
import {UserEntity} from "../user/user.entity";
import {HttpException, HttpStatus} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {ModuleEntity} from "../module/module.entity";

export class QuestionnaireService {
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


    async getAllQuestionnaires(): Promise<QuestionnaireDto[]> {
        const questionnaires = await this.questionnaireRepository.find();
        return questionnaires.map(questionnaire => toQuestionnaireDto(questionnaire));
    }

    async getQuestionnaireById(id: number): Promise<QuestionnaireDto> {
        const questionnaire = await this.questionnaireRepository.findOne(
            {where: {id}, relations: ["questions","module"]});
        if (!questionnaire) throw new HttpException("Questionnaire not found", HttpStatus.NOT_FOUND);

        if (questionnaire.isFinished) {
            return toQuestionnaireDto(questionnaire);
        }

        return toQuestionnaireWithoutResponses(questionnaire);
    }

    async createQuestionnaire(questionnaireCreateDto: QuestionnaireCreateDto, sessionId) {
        if (!questionnaireCreateDto.name || !questionnaireCreateDto.time || !questionnaireCreateDto.moduleId) {
            throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
        }
        const module = await this.moduleRepository.findOne({where: {id: questionnaireCreateDto.moduleId}, relations: ["author"]});
        if (!module) throw new HttpException("module not found", HttpStatus.NOT_FOUND);

        if(module.author.id != sessionId) throw new HttpException("You are not the author of this module", HttpStatus.UNAUTHORIZED);

        const newQuestionnaire = await this.questionnaireRepository.create({
            name: questionnaireCreateDto.name,
            time: questionnaireCreateDto.time,
            module: module,
            isOpen: false,
            isFinished: false
        });
        try {
            await this.questionnaireRepository.save(newQuestionnaire);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }


    async createQuestion(questionCreateDto: QuestionCreateDto, sessionId) {

        if (!questionCreateDto.questionText || !questionCreateDto.correctOption || !questionCreateDto.options
            || !questionCreateDto.questionnaireId) {
            throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
        }

        const questionnaire = await this.questionnaireRepository.findOne({
            where: {id: questionCreateDto.questionnaireId},
            relations: ["module", "module.author"]
        });
        if (!questionnaire) throw new HttpException("Questionnaire not found", HttpStatus.NOT_FOUND);
        if (questionnaire.module.author.id != sessionId) {
            throw new HttpException("You are not the author of this questionnaire", HttpStatus.UNAUTHORIZED);
        }

        // create Question Entity
        const newQuestion = await this.questionRepository.create({
            questionText: questionCreateDto.questionText,
            correctOption: questionCreateDto.correctOption,
            options: questionCreateDto.options,
            questionnaire: questionnaire
        });

        try {
            await this.questionRepository.save(newQuestion);
        } catch (error) {
            throw new HttpException("Error creating question", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async changeState(id: number, sessionId) {
        const questionnaire = await this.questionnaireRepository.findOne({where: {id}, relations: ["module", "module.author"]});
        if (!questionnaire) throw new HttpException("Questionnaire not found", HttpStatus.NOT_FOUND);
        if (questionnaire.module.author.id != sessionId) {
            throw new HttpException("You are not authorized to finish this questionnaire", HttpStatus.UNAUTHORIZED);
        }
        if(questionnaire.isOpen && !questionnaire.isFinished){
            questionnaire.isFinished = true;
        }
        questionnaire.isOpen = !questionnaire.isOpen;
        try {
            await this.questionnaireRepository.save(questionnaire);
            return questionnaire.isOpen;
        } catch (error) {
            throw new HttpException("Error changing state", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}