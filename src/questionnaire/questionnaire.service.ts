import {Repository} from "typeorm";
import {QuestionEntity} from "../question/question.entity";
import {QuestionnaireEntity} from "./questionnaire.entity";
import {QuestionnaireCreateDto, QuestionnaireDto} from "./questionnaire.dto";
import {toQuestionnaireDto, toQuestionnaireWithoutResponses} from "../shared/mapper";
import {QuestionCreateDto} from "../question/question.dto";
import {UserEntity} from "../user/user.entity";
import {HttpException, HttpStatus} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";

export class QuestionnaireService {
    constructor(
        @InjectRepository(QuestionEntity)
        private readonly questionRepository: Repository<QuestionEntity>,
        @InjectRepository(QuestionnaireEntity)
        private readonly questionnaireRepository: Repository<QuestionnaireEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ) {
    }


    async getAllQuestionnaires(): Promise<QuestionnaireDto[]> {
        const questionnaires = await this.questionnaireRepository.find();
        return questionnaires.map(questionnaire => toQuestionnaireDto(questionnaire));
    }

    async getQuestionnaireById(id: number): Promise<QuestionnaireDto> {
        const questionnaire = await this.questionnaireRepository.findOne(
            {where: {id}, relations: ["author", "questions"]});
        if (!questionnaire) throw new HttpException("Questionnaire not found", HttpStatus.NOT_FOUND);

        if (questionnaire.isOpen) {
            return toQuestionnaireDto(questionnaire);
        }

        return toQuestionnaireWithoutResponses(questionnaire);
    }

    async createQuestionnaire(questionnaireCreateDto: QuestionnaireCreateDto, sessionId) {
        if (!questionnaireCreateDto.name || !questionnaireCreateDto.time) {
            throw new HttpException("Missing Fields", HttpStatus.BAD_REQUEST);
        }
        const author = await this.userRepository.findOne({where: {id: sessionId}});
        if (!author) throw new HttpException("Author not found", HttpStatus.NOT_FOUND);

        const newQuestionnaire = await this.questionnaireRepository.create({
            name: questionnaireCreateDto.name,
            time: questionnaireCreateDto.time,
            author: author,
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
            relations: ["author"]
        });
        if (!questionnaire) throw new HttpException("Questionnaire not found", HttpStatus.NOT_FOUND);
        if (questionnaire.author.id != sessionId) {
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
        const questionnaire = await this.questionnaireRepository.findOne({where: {id}, relations: ["author"]});
        if (!questionnaire) throw new HttpException("Questionnaire not found", HttpStatus.NOT_FOUND);
        if (questionnaire.author.id != sessionId) {
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