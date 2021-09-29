import { Receipt_Option_Product } from "./receipt_options_product.entity";
import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Receipt } from "./receipt.entity";
import { OneToMany } from "typeorm";
import { Common } from "./helper/common.helper";

@Entity()
export class Receipt_Product extends Common {
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

  @OneToMany(
    () => Receipt_Option_Product,
    (receipt: any) => receipt.receipt_product
  )
  receipt_option_products: Receipt_Option_Product[];
}
