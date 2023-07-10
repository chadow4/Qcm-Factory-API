import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { QuestionnaireEntity } from "../questionnaire/questionnaire.entity";
import { OptionEntity } from "../option/option.entity";

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionText: string;

  @Column()
  correctOption: string;

  @ManyToOne(() => QuestionnaireEntity, questionnaire => questionnaire.questions)
  questionnaire: QuestionnaireEntity;

  @OneToMany(() => OptionEntity, option => option.question, { cascade: true })
  options: OptionEntity[];
}
