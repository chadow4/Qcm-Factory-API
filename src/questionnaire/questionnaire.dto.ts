import { UserDto } from "../user/user.dto";
import { IsNotEmpty } from "class-validator";
import { QuestionDto } from "../question/question.dto";

export interface QuestionnaireCreateDto {
  name: string;
  time: number;
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
  isOpen: boolean;
  @IsNotEmpty()
  author: UserDto;
  questions: QuestionDto[];
}

