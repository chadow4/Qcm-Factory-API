import { ModuleEntity } from "../module/module.entity";
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {FileEntity} from "../file/file.entity";

@Entity()
export class SectionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => ModuleEntity, module => module.sections)
    module: ModuleEntity;

    @OneToMany(() => FileEntity, file => file.section, {cascade: true})
    files: FileEntity[];
}