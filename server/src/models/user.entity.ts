import { OneToMany } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./helper/common.helper";
import { Receipt } from "./receipt.entity";

@Entity()
export class User extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  address: string;

  @Column()
  phone: number;

  @OneToMany(() => Receipt, (receipt: any) => receipt.user)
  receipts: Receipt[];
}
