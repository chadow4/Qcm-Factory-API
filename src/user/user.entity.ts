import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "../auth/interface/role.enum";
import { QuestionnaireEntity } from "../questionnaire/questionnaire.entity";
import {ResultEntity} from "../result/result.entity";
import {ModuleEntity} from "../module/module.entity";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  firstname: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  lastname: string;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  email: string;

  @Column({
    type: "varchar",
    nullable: false
  })
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  @Column({
    type: "varchar",
    nullable: true
  })
  role: Role;

  @OneToMany(() => ModuleEntity, module => module.author, { cascade: true })
  myModules: ModuleEntity[];

  @OneToMany(() => ResultEntity, result => result.student,{ cascade: true })
  myResults: ResultEntity[];

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
