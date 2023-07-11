import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {QuestionnaireDto, QuestionnairePartialDto} from '../questionnaire/questionnaire.dto';

export class QuestionCreateDto {
  @ApiProperty({ description: 'Text of the question' })
  @IsNotEmpty()
  questionText: string;

  @ApiProperty({ description: 'Correct option for the question' })
  @IsNotEmpty()
  correctOption: string;

  @ApiProperty({ type: [String], description: 'Options for the question' })
  @IsNotEmpty()
  options: string[];

  @ApiProperty({ description: 'ID of the questionnaire the question belongs to' })
  @IsNotEmpty()
  questionnaireId: number;
}

export class QuestionDeleteDto {
  @ApiProperty({ description: 'ID of the question to delete' })
  @IsNotEmpty()
  id: number;
}

export class QuestionDto {
  @ApiProperty({ description: 'ID of the question' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Text of the question' })
  @IsNotEmpty()
  questionText: string;

  @ApiProperty({ description: 'Correct option for the question' })
  @IsNotEmpty()
  correctOption: string;

  @ApiProperty({ type: [String], description: 'Options for the question' })
  @IsNotEmpty()
  options: string[];

  @ApiProperty({ type: () => QuestionnairePartialDto, description: 'Questionnaire the question belongs to' })
  questionnaire: QuestionnaireDto;
}

export class QuestionPartialDto{
    @ApiProperty({ description: 'ID of the question' })
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: 'Text of the question' })
    @IsNotEmpty()
    questionText: string;

    @ApiProperty({ description: 'Correct option for the question' })
    @IsNotEmpty()
    correctOption: string;

    @ApiProperty({ type: [String], description: 'Options for the question' })
    @IsNotEmpty()
    options: string[];
}

export class QuestionWithoutResponseDto {
  @ApiProperty({ description: 'ID of the question' })
  @IsNotEmpty()
  id: number;

  @ApiProperty({ description: 'Text of the question' })
  @IsNotEmpty()
  questionText: string;

  @ApiProperty({ type: [String], description: 'Options for the question' })
  @IsNotEmpty()
  options: string[];

  @ApiProperty({ type: () => QuestionnaireDto, description: 'Questionnaire the question belongs to' })
  questionnaire: QuestionnaireDto;
}
