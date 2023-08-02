import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {SectionEntity} from "../section/section.entity";

@Entity()
export class ResourceEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({type: 'text'})
    content: string;

    @ManyToOne(() => SectionEntity, section => section.resources)
    section: SectionEntity;
}