import { ManyToOne } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from './helper/common.helper';
import { Product } from './product.entity';

@Entity()
export class ProductImg extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  imgPath: string;

  @ManyToOne(() => Product, (product) => product.productImg)
  product: Product;
}
