import { product } from './../seed/seed';
import { Product } from './product.entity';
import { ReceiptOptionProduct } from './receiptOptionsProduct.entity';
import { ManyToOne, JoinColumn, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Receipt } from './receipt.entity';
import { OneToMany } from 'typeorm';
import { Common } from './helper/common.helper';

@Entity()
export class ReceiptProduct extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  pruductName: string;

  @Column()
  quanlity: number;

  @Column()
  unitPrice: number;

  // @Column()
  // productId: number;

  @ManyToOne(() => Receipt, (receipt: Receipt) => receipt.receiptProducts)
  receipt: Receipt;

  @OneToMany(() => ReceiptOptionProduct, (receipt: any) => receipt.receiptProduct)
  receiptOptionProducts: ReceiptOptionProduct[];

  @ManyToMany(() => Product, (product: any) => product.receiptProduct)
  @JoinTable()
  product: Product[];
}
