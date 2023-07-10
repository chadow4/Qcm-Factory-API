import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from "bcrypt";
import { Role } from "../auth/interface/role.enum";

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  firstname: string;

  @Column({
    type: "varchar",
    nullable: false,
    unique: true
  })
  lastname: string;

  @Column({
    type: "varchar",
    nullable: false
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

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
