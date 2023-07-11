import {UserDto} from "../user/user.dto";
import {UserEntity} from "../user/user.entity";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {QuestionnaireDto} from "../questionnaire/questionnaire.dto";
import {QuestionDto, QuestionWithoutResponseDto} from "../question/question.dto";
import {QuestionEntity} from "../question/question.entity";


export const toUserDto = (data: UserEntity): UserDto => {
    const {id, firstname, lastname, email, role, questionnaires} = data;
    return {
        id,
        firstname,
        lastname,
        email,
        role,
        questionnaires: questionnaires && questionnaires.map(questionnaire => toQuestionnaireDto(questionnaire))
    };
};

export const toQuestionnaireDto = (data: QuestionnaireEntity): QuestionnaireDto => {
    const {id, name, time, author, questions} = data;
    return <QuestionnaireDto>{
        id,
        name,
        time,
        author: author && toUserDto(author),
        questions: questions && questions.map(question => toQuestionDto(question))
    };
};

export const toQuestionnaireWithoutResponses = (data: QuestionnaireEntity): QuestionnaireDto => {
    const {id, name, time, author, questions} = data;
    return <QuestionnaireDto>{
        id,
        name,
        time,
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


