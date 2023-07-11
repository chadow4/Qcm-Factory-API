import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { QuestionnaireEntity } from "../questionnaire/questionnaire.entity";

@Entity()
export class QuestionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  questionText: string;

  @Column()
  correctOption: string;

  @Column({ type: 'json' }) // Utilisez le type de données JSON
  options: string[];

  @ManyToOne(() => QuestionnaireEntity, questionnaire => questionnaire.questions)
  questionnaire: QuestionnaireEntity;
}
