import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SectionEntity} from "../section/section.entity";

@Entity()
export class FileEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    path: string;

    @Column()
    type: string;

    @Column()
    size: number;

    @ManyToOne(() => SectionEntity, section => section.files)
    section: SectionEntity;
}