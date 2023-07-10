import { UserDto } from "../user/user.dto";
import { IsNotEmpty } from "class-validator";
import { QuestionDto } from "../question/question.dto";

export interface QuestionaireCreateDto {
  name: string;
  time: number;
  authorId: number;
}

export interface QuestionnaireDeleteDto {
  id: number;
}

export class QuestionnaireDto{
  @IsNotEmpty()
  id: number;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  time: number;
  @IsNotEmpty()
  author: UserDto;
  questions: QuestionDto[];
}