import {UserDto} from "../user/user.dto";
import {UserEntity} from "../user/user.entity";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {QuestionnaireDto} from "../questionnaire/questionnaire.dto";
import {QuestionDto, QuestionWithoutResponseDto} from "../question/question.dto";
import {QuestionEntity} from "../question/question.entity";
import {ResultEntity} from "../result/result.entity";
import {ResultDto} from "../result/result.dto";


export const toUserDto = (data: UserEntity): UserDto => {
    const {id, firstname, lastname, email, role, questionnaires,results} = data;
    return {
        id,
        firstname,
        lastname,
        email,
        role,
        questionnaires: questionnaires && questionnaires.map(questionnaire => toQuestionnaireDto(questionnaire)),
        results: results && results.map(result => toResultDto(result))
    };
};


export const toResultDto = (data: ResultEntity): ResultDto => {
    const {id, responses, questionnaire, student,mark} = data;
    return <ResultDto>{
        id,
        responses,
        mark,
        questionnaire: questionnaire && toQuestionnaireDto(questionnaire),
        student: student && toUserDto(student)
    };
}
export const toQuestionnaireDto = (data: QuestionnaireEntity): QuestionnaireDto => {
    const {id, name, time,isOpen, author, questions, isFinished} = data;
    return <QuestionnaireDto>{
        id,
        name,
        time,
        isOpen,
        isFinished,
        author: author && toUserDto(author),
        questions: questions && questions.map(question => toQuestionDto(question))
    };
};

export const toQuestionnaireWithoutResponses = (data: QuestionnaireEntity): QuestionnaireDto => {
    const {id, name, time,isOpen, author, questions,isFinished} = data;
    return <QuestionnaireDto>{
        id,
        name,
        time,
        isOpen,
        isFinished,
        author: author && toUserDto(author),
        questions: questions && questions.map(question => toQuestionWithoutResponsesDto(question))
    };
};


export const toQuestionDto = (data: QuestionEntity): QuestionDto => {
    const {id, questionText, correctOption, questionnaire, options} = data;
    return <QuestionDto>{
        id,
        questionText,
        correctOption,
        questionnaire: questionnaire && toQuestionnaireDto(questionnaire),
        options
    };
};


export const toQuestionWithoutResponsesDto = (data: QuestionEntity): QuestionWithoutResponseDto => {
    const {id, questionText, correctOption, questionnaire, options} = data;
    return <QuestionWithoutResponseDto>{
        id,
        questionText,
        questionnaire: questionnaire && toQuestionnaireDto(questionnaire),
        options
    };
};


