import {IsNotEmpty} from "class-validator";
import {QuestionnaireDto} from "../questionnaire/questionnaire.dto";
import {UserDto} from "../user/user.dto";

export class ModuleCreateDto {
    name: string;
}

export class ModuleUpdateDto {
    name?: string;
}

export class ModuleDeleteDto {
    id: number;
}

export class ModuleDto {
    @IsNotEmpty()
    id: number;
    @IsNotEmpty()
    name: string;
    questionnaire: QuestionnaireDto[];
    author: UserDto;
}