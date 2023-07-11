import { IsNotEmpty } from "class-validator";
import { QuestionnaireDto } from "../questionnaire/questionnaire.dto";

export interface QuestionCreateDto {
  questionText: string;
  correctOption: string;
  options : string[];
  questionnaireId: number;
}

export interface QuestionDeleteDto {
  id: number;
}

export class QuestionDto{
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  questionText: string;
  @IsNotEmpty()
  correctOption: string;
  @IsNotEmpty()
  options: string[];
  questionnaire : QuestionnaireDto;
}

export class QuestionWithoutResponseDto{
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  questionText: string;
  @IsNotEmpty()
  options: string[];
  questionnaire : QuestionnaireDto;

}