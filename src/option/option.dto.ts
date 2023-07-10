import { IsNotEmpty } from "class-validator";

export interface OptionCreateDto {
  value: string;
}

export interface OptionDeleteDto {
  id: number;
}

export class OptionDto{
  @IsNotEmpty()
  value: string;
}