import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

}

