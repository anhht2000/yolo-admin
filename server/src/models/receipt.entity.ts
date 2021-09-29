import { Receipt_Product } from "./receipt_product.entity";
import { User } from "./user.entity";
import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";

@Entity()
export class Receipt {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  description: string;

  @Column()
  address: string;

  @Column()
  totalPrice: string;

  @ManyToOne(() => User, (user: any) => user.receipts)
  user: User;

  @OneToMany(
    () => Receipt_Product,
    (receipt_product: any) => receipt_product.receipt
  )
  receipt_products: Receipt_Product;
}
