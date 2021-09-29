import { User } from "./user.entity";
import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Receipt } from "./receipt.entity";

@Entity()
export class Receipt_Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pruduct_name: string;

  @Column()
  quanlity: number;

  @Column()
  unit_price: string;

  @ManyToOne(() => Receipt, (receipt: any) => receipt.receipt_products)
  receipt: Receipt;
}
