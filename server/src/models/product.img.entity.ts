import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./helper/common.helper";
import { Product } from "./product.entity";

@Entity()
export class Product_Img extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgPath: string;

  @ManyToOne(() => Product, (product) => product.product_img)
  product: Product;
}
