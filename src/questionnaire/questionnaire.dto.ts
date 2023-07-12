import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {UserDto, UserPartialDto} from '../user/user.dto';
import {QuestionDto, QuestionPartialDto} from '../question/question.dto';

export class QuestionnaireCreateDto {
  @ApiProperty({ description: 'Name of the questionnaire' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Time allocated for the questionnaire' })
  @IsNotEmpty()
  time: number;
}

export class QuestionnaireDeleteDto {
  @ApiProperty({ description: 'ID of the questionnaire to delete' })
  @IsNotEmpty()
  id: number;
}

export class QuestionnaireDto {
  @ApiProperty({ description: 'ID of the questionnaire' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Name of the questionnaire' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Time allocated for the questionnaire' })
  @IsNotEmpty()
  time: number;

  @ApiProperty({ description: 'Flag indicating if the questionnaire is open' })
  @IsNotEmpty()
  isOpen: boolean;

  @ApiProperty({ type: () => UserPartialDto, description: 'Author of the questionnaire' })
  @IsNotEmpty()
  author: UserDto;

  @ApiProperty({ type: () => [QuestionPartialDto], description: 'List of questions in the questionnaire' })
  questions: QuestionDto[];
}

export class QuestionnairePartialDto{
  @ApiProperty({ description: 'ID of the questionnaire' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Name of the questionnaire' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Time allocated for the questionnaire' })
  @IsNotEmpty()
  time: number;

  @ApiProperty({ description: 'Flag indicating if the questionnaire is open' })
  @IsNotEmpty()
  isOpen: boolean;

}

