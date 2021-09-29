import { OneToOne } from "typeorm";
import { OneToMany } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Receipt } from "./receipt.entity";

@Entity()
export class User {
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
