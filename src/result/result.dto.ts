import {QuestionnaireDto, QuestionnairePartialDto} from "../questionnaire/questionnaire.dto";
import {UserDto, UserPartialDto} from "../user/user.dto";
import {ApiProperty} from "@nestjs/swagger";
import {QuestionPartialDto} from "../question/question.dto";
import {IsNotEmpty} from "class-validator";

export class ResultCreateDto {
    @ApiProperty({type: () => [String], description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @IsNotEmpty()
    @ApiProperty({type: () => [Number], description: 'ID of the questionnaire'})
    questionnaireId: number;
}

export class ResultDto {
    @ApiProperty({type: () => [Number], description: 'ID of the result'})
    @IsNotEmpty()
    id: number;
    @ApiProperty({type: () => [Number], description: 'Mark of the result'})
    @IsNotEmpty()
    mark: number;
    @ApiProperty({type: () => [String], description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @ApiProperty({type: () => [QuestionPartialDto], description: 'List of questions in the questionnaire'})
    questionnaire: QuestionnaireDto;
    @ApiProperty({type: () => [UserPartialDto], description: 'Student who answered the questionnaire'})
    student: UserDto;
}
export class ResultPartialGlobalDto {
    @ApiProperty({type: () => [Number], description: 'Mark of the result'})
    @IsNotEmpty()
    mark: number;
    @ApiProperty({type: () => [Number], description: 'ID of the result'})
    @IsNotEmpty()
    id: number;
    @ApiProperty({type: () => [String], description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @ApiProperty({type: () => [UserPartialDto], description: 'Student who answered the questionnaire'})
    student: UserDto;
}

export class ResultPartialDto {
    @ApiProperty({type: () => [Number], description: 'Mark of the result'})
    @IsNotEmpty()
    mark: number;
    @ApiProperty({type: () => [Number], description: 'ID of the result'})
    @IsNotEmpty()
    id: number;
    @ApiProperty({type: () => [String], description: 'List of responses to the questionnaire'})
    @IsNotEmpty()
    responses: string[];
    @ApiProperty({type: () => [QuestionnaireDto], description: 'List of questions in the questionnaire'})
    questionnaire: QuestionnaireDto;
}