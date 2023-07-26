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
import {SectionDto} from "../section/section.dto";
import {SectionEntity} from "../section/section.entity";
import {FileEntity} from "../file/file.entity";
import {FileDto} from "../file/file.dto";


export const toUserDto = (data: UserEntity): UserDto => {
    const {id, firstname, lastname, email, role, myModules, myResults} = data;
    return <UserDto><unknown>{
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
    const {id, name, author, questionnaire, sections} = data;
    return <ModuleDto><unknown>{
        id,
        name,
        author: author && toUserDto(author),
        questionnaire: questionnaire && questionnaire.map(questionnaire => toQuestionnaireDto(questionnaire)),
        sections: sections && sections.map(section => toSectionDto(section))
    };

}

export const toResultDto = (data: ResultEntity): ResultDto => {
    const {id, responses, questionnaire, student, mark} = data;
    return <ResultDto>{
        id,
        responses,
        mark,
        questionnaire: questionnaire && toQuestionnaireDto(questionnaire),
        student: student && toUserDto(student)
    };
}
export const toQuestionnaireDto = (data: QuestionnaireEntity): QuestionnaireDto => {
    const {id, name, time, isOpen, module, questions, isFinished} = data;
    return <QuestionnaireDto><unknown>{
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
    const {id, name, time, isOpen, module, questions, isFinished} = data;
    return <QuestionnaireDto><unknown>{
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

export const toSectionDto = (data: SectionEntity): SectionDto => {
    const {id, name, module, files} = data;
    return <SectionDto><unknown>{
        id,
        name,
        module: module && toModuleDto(module),
        files: files && files.map(file => toFileDto(file))


    };
}

export const toFileDto = (data: FileEntity): FileDto => {
    const {id, name,type, path, size, section} = data;
    return <FileDto><unknown>{
        id,
        name,
        path,
        type,
        size,
        section: section && toSectionDto(section),
    };
}


