import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {ResultEntity} from "./result.entity";
import {toResultDto} from "../shared/mapper";
import {ResultCreateDto, ResultDto} from "./result.dto";

@Injectable()
export class ResultService {
    constructor(
        @InjectRepository(QuestionnaireEntity)
        private readonly questionnaireRepository: Repository<QuestionnaireEntity>,
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        @InjectRepository(ResultEntity)
        private readonly resultRepository: Repository<ResultEntity>
    ) {
    }

    async getAllResultsForQuestionnaire(idQuestionnaire: number): Promise<ResultDto[]> {
        const results = await this.resultRepository.find(
            {
                where: {questionnaire: {id: idQuestionnaire}},
                relations: ["student"]
            });
        return results.map(result => toResultDto(result));
    }

    async getResultForQuestionnaire(idQuestionnaire: number, idStudent: number): Promise<ResultDto> {
        const result = await this.resultRepository.findOne(
            {
                where: {questionnaire: {id: idQuestionnaire}, student: {id: idStudent}},
                relations: ["questionnaire", "questionnaire.questions"]
            });
        if(!result) throw new HttpException("Result not found", HttpStatus.NOT_FOUND);
        return toResultDto(result);

    }

    async createResult(resultCreateDto: ResultCreateDto, sessionId) {
        const student = await this.userRepository.findOne({where: {id: sessionId}});
        const questionnaire = await this.questionnaireRepository.findOne(
            {
                where: {id: resultCreateDto.questionnaireId},
                relations: ["questions"]
            });
        if (!student || !questionnaire) throw new HttpException("Student or Questionnaire not found", HttpStatus.NOT_FOUND);

        let mark = 0;
        for (let i = 0; i < questionnaire.questions.length; i++) {
            if (questionnaire.questions[i].correctOption == resultCreateDto.responses[i]) {
                mark++;
            }
        }
        let mark20 = (mark / questionnaire.questions.length) * 20;
        const newResult = await this.resultRepository.create({
            mark: mark20,
            responses: resultCreateDto.responses,
            questionnaire: questionnaire,
            student: student
        });
        try {
            await this.resultRepository.save(newResult);
        } catch (error) {
            throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}