import { IsEmail, IsNotEmpty } from "class-validator";
import { Role } from "../auth/interface/role.enum";
import { QuestionnaireDto } from "../questionnaire/questionnaire.dto";

export interface UserCreateDto {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export interface UserUpdateDto {
  firstname?: string;
  lastname?: string;
  email?: string;
  password?: string;
}

export interface UserDeleteDto {
  id: number;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export class UserDto {
  @IsNotEmpty()
  id: number;

  @IsNotEmpty()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  role: Role;
  questionnaires : QuestionnaireDto[];
}
