import { Repository } from "typeorm";
import { QuestionEntity } from "../question/question.entity";
import { QuestionnaireEntity } from "./questionnaire.entity";
import { QuestionnaireCreateDto, QuestionnaireDto } from "./questionnaire.dto";
import { toQuestionDto, toQuestionnaireDto } from "../shared/mapper";
import { OptionEntity } from "../option/option.entity";
import { QuestionCreateDto, QuestionDto } from "../question/question.dto";
import { UserEntity } from "../user/user.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

export class QuestionnaireService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(QuestionnaireEntity)
    private readonly questionnaireRepository: Repository<QuestionnaireEntity>,
    @InjectRepository(OptionEntity)
    private readonly optionRepository: Repository<OptionEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>
  ) {
  }


  async getAllQuestionnaires(): Promise<QuestionnaireDto[]> {
    const questionnaires = await this.questionnaireRepository.find({ relations: ["author"] });
    return questionnaires.map(questionnaire => toQuestionnaireDto(questionnaire));
  }

  async getQuestionnaireById(id: number): Promise<QuestionnaireDto> {
    const questionnaire = await this.questionnaireRepository.findOne(
      { where: { id }, relations: ["author", "questions", "questions.options"] });
    if (!questionnaire) throw new HttpException("Questionnaire not found", HttpStatus.NOT_FOUND);
    return toQuestionnaireDto(questionnaire);
  }

  async createQuestionnaire(questionnaireCreateDto: QuestionnaireCreateDto, sessionId): Promise<QuestionnaireDto> {
    if (!questionnaireCreateDto.authorId || sessionId != questionnaireCreateDto.authorId) {
      throw new HttpException("You are not authorized to create this questionnaire", HttpStatus.UNAUTHORIZED);
    }
    const author = await this.userRepository.findOne({ where: { id: questionnaireCreateDto.authorId } });
    if (!author) throw new HttpException("Author not found", HttpStatus.NOT_FOUND);

    const newQuestionnaire = await this.questionnaireRepository.create({
      name: questionnaireCreateDto.name,
      time: questionnaireCreateDto.time,
      author: author
    });
    const result = await this.questionnaireRepository.save(newQuestionnaire);
    return toQuestionnaireDto(result);
  }


  async createQuestion(questionCreateDto: QuestionCreateDto): Promise<QuestionDto> {
    const questionnaire = await this.questionnaireRepository.findOne({
      where: { id: questionCreateDto.questionnaireId }
    });
    if (!questionnaire) throw new HttpException("Questionnaire not found", HttpStatus.NOT_FOUND);

    // create Options Entities
    const optionsValues = [] as OptionEntity[];
    for (const optionValue of questionCreateDto.options) {
      const newOption = await this.optionRepository.create({
        value: optionValue
      });
      optionsValues.push(newOption);
    }
      // create Question Entity
      const newQuestion = await this.questionRepository.create({
        questionText: questionCreateDto.questionText,
        correctOption: questionCreateDto.correctOption,
        questionnaire: questionnaire,
        options: optionsValues
      });

      try {
        const questionSave = await this.questionRepository.save(newQuestion);
        return toQuestionDto(questionSave);
      } catch (error) {
        throw new HttpException("Error creating question", HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

}