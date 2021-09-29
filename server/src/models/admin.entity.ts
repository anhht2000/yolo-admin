import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./helper/common.helper";

@Entity()
export class Admin extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;
}
