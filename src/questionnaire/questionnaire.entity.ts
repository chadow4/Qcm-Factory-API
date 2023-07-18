import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionEntity} from "../question/question.entity";
import {ResultEntity} from "../result/result.entity";
import {ModuleEntity} from "../module/module.entity";

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

    @Column()
    isFinished: boolean;

    @OneToMany(() => QuestionEntity, question => question.questionnaire, {cascade: true})
    questions: QuestionEntity[];

    @ManyToOne(() => ModuleEntity, module => module.questionnaire)
    module: ModuleEntity;

    @OneToMany(() => ResultEntity, result => result.questionnaire,{cascade: true})
    results: ResultEntity[];
}
