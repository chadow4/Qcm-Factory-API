import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { QuestionEntity } from "../question/question.entity";

@Entity()
export class OptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: string;

  @ManyToOne(() => QuestionEntity, question => question.options)
  question: QuestionEntity;
}
