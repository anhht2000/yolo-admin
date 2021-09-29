import { Receipt_Product } from "./receipt_product.entity";
import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./helper/common.helper";

@Entity()
export class Receipt_Option_Product extends Common {
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
