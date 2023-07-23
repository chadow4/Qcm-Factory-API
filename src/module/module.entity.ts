import {UserEntity} from "../user/user.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {QuestionnaireEntity} from "../questionnaire/questionnaire.entity";
import {SectionEntity} from "../section/section.entity";

@Entity()
export class ModuleEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => QuestionnaireEntity, questionnaire => questionnaire.module, {cascade: true})
    questionnaire: QuestionnaireEntity[];

    @OneToMany(() => SectionEntity, section => section.module, {cascade: true})
    sections: SectionEntity[];

    @ManyToOne(() => UserEntity, user => user.myModules)
    author: UserEntity;
}
