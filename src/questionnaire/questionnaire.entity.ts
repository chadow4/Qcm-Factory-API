import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "../question/question.entity";
import {UserEntity} from "../user/user.entity";
import {ResultEntity} from "../result/result.entity";

@Entity()
export class QuestionnaireEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    time: number;

    @Column()
    isOpen: boolean;

    @OneToMany(() => QuestionEntity, question => question.questionnaire, {cascade: true})
    questions: QuestionEntity[];

    @ManyToOne(() => UserEntity, user => user.questionnaires)
    author: UserEntity;

    @OneToMany(() => ResultEntity, result => result.questionnaire)
    results: ResultEntity[];
}
