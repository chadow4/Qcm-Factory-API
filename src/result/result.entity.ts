import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { QuestionnaireEntity } from "../questionnaire/questionnaire.entity";
import {UserEntity} from "../user/user.entity";

@Entity()
export class ResultEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    mark : number;

    @Column({ type: 'json' })
    responses: string[];

    @ManyToOne(() => QuestionnaireEntity, questionnaire => questionnaire.results)
        questionnaire: QuestionnaireEntity;

        @ManyToOne(() => UserEntity, student => student.myResults)
        student: UserEntity;
}
