import {QuestionEntity} from "../question/question.entity";
import {UserEntity} from "../user/user.entity";
import {ResultEntity} from "../result/result.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";

@Entity()
export class ModuleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => QuestionnaireEntity, questionnaire => questionnaire.module, {cascade: true})
    questionnaire: QuestionnaireEntity[];

    @ManyToOne(() => UserEntity, user => user.myModules)
    author: UserEntity;
}
