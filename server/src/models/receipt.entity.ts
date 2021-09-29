import { ReceiptProduct } from "./receiptProduct.entity";
import { User } from "./user.entity";
import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { OneToMany } from "typeorm";
import { Common } from "./helper/common.helper";

@Entity()
export class Receipt extends Common {
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
    () => ReceiptProduct,
    (receiptProduct: any) => receiptProduct.receipt
  )
  receiptProducts: ReceiptProduct;
}
