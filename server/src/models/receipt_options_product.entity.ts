import { Receipt_Product } from "./receipt_product.entity";
import { User } from "./user.entity";
import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";

@Entity()
export class Receipt_Option_Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_name: string;

  @Column()
  product_option_name: string;

  @Column()
  product_option_value: string;

  @ManyToOne(
    () => Receipt_Product,
    (receipt_product: any) => receipt_product.receipt_option_products
  )
  receipt_product: Receipt_Product;
}
