import {Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {Repository} from "typeorm";
import {UserEntity} from "../user/user.entity";
import {ResultEntity} from "./result.entity";
import {toResultDto} from "../shared/mapper";
import {ResultDto} from "./result.dto";

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
                relations: ["questionnaire","questionnaire.questions"]
            });
        return toResultDto(result);

    }
}