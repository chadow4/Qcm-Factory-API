import {QuestionnaireDto, QuestionnairePartialDto} from "../questionnaire/questionnaire.dto";
import {UserDto, UserPartialDto} from "../user/user.dto";
import {ApiProperty} from "@nestjs/swagger";
import {QuestionPartialDto} from "../question/question.dto";
import {IsNotEmpty} from "class-validator";

export class ResultCreateDto {
    @ApiProperty({description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @IsNotEmpty()
    @ApiProperty({description: 'ID of the questionnaire'})
    questionnaireId: number;
}

export class ResultDto {
    @ApiProperty({description: 'ID of the result'})
    @IsNotEmpty()
    id: number;
    @ApiProperty({ description: 'Mark of the result'})
    @IsNotEmpty()
    mark: number;
    @ApiProperty({description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @ApiProperty({type: () => QuestionPartialDto, description: 'List of questions in the questionnaire'})
    questionnaire: QuestionnaireDto;
    @ApiProperty({type: () => UserPartialDto, description: 'Student who answered the questionnaire'})
    student: UserDto;
}
export class ResultPartialGlobalDto {
    @ApiProperty({ description: 'Mark of the result'})
    @IsNotEmpty()
    mark: number;
    @ApiProperty({description: 'ID of the result'})
    @IsNotEmpty()
    id: number;
    @ApiProperty({ description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @ApiProperty({type: () => UserPartialDto, description: 'Student who answered the questionnaire'})
    student: UserDto;
}

export class ResultPartialDto {
    @ApiProperty({description: 'Mark of the result'})
    @IsNotEmpty()
    mark: number;
    @ApiProperty({description: 'ID of the result'})
    @IsNotEmpty()
    id: number;
    @ApiProperty({description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @ApiProperty({type: () => QuestionnaireDto, description: 'List of questions in the questionnaire'})
    questionnaire: QuestionnaireDto;
}

export class ResultPartialForUserDto {
    @ApiProperty({description: 'Mark of the result'})
    @IsNotEmpty()
    mark: number;
    @ApiProperty({description: 'ID of the result'})
    @IsNotEmpty()
    id: number;
    @ApiProperty({ description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @ApiProperty({type: () => QuestionnairePartialDto, description: 'List of questions in the questionnaire'})
    questionnaire: QuestionnaireDto;
}