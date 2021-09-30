import { ReceiptProduct } from "./receiptProduct.entity";
import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./helper/common.helper";

@Entity()
export class ReceiptOptionProduct extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  productName: string;

  @Column()
  productOptionName: string;

  @Column()
  productOptionValue: string;

  @ManyToOne(
    () => ReceiptProduct,
    (receiptProduct: any) => receiptProduct.receiptOptionProducts
  )
  receiptProduct: ReceiptProduct;
}
