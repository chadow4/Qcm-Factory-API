import {UserDto} from "../user/user.dto";
import {UserEntity} from "../user/user.entity";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {QuestionnaireDto} from "../questionnaire/questionnaire.dto";
import {QuestionDto, QuestionWithoutResponseDto} from "../question/question.dto";
import {QuestionEntity} from "../question/question.entity";
import {ResultEntity} from "../result/result.entity";
import {ResultDto} from "../result/result.dto";
import {ModuleDto} from "../module/module.dto";
import {ModuleEntity} from "../module/module.entity";


export const toUserDto = (data: UserEntity): UserDto => {
    const {id, firstname, lastname, email, role, myModules,myResults} = data;
    return <UserDto>{
        id,
        firstname,
        lastname,
        email,
        role,
        myModules: myModules && myModules.map(myModule => toModuleDto(myModule)),
        myResults: myResults && myResults.map(result => toResultDto(result))
    };
};

export const toModuleDto = (data: ModuleEntity): ModuleDto => {
    const {id, name, author, questionnaire} = data;
    return <ModuleDto>{
        id,
        name,
        author: author && toUserDto(author),
        questionnaire: questionnaire && questionnaire.map(questionnaire => toQuestionnaireDto(questionnaire))
    };

}

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
    const {id, name, time,isOpen, module, questions, isFinished} = data;
    return <QuestionnaireDto>{
        id,
        name,
        time,
        isOpen,
        isFinished,
        module: module && toModuleDto(module),
        questions: questions && questions.map(question => toQuestionDto(question))
    };
};

export const toQuestionnaireWithoutResponses = (data: QuestionnaireEntity): QuestionnaireDto => {
    const {id, name, time,isOpen, module, questions,isFinished} = data;
    return <QuestionnaireDto>{
        id,
        name,
        time,
        isOpen,
        isFinished,
        module: module && toModuleDto(module),
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


