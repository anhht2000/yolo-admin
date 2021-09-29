import { ManyToOne } from "typeorm";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class Product_Img {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imgPath: string;

  @ManyToOne(() => Product, (product) => product.product_img)
  product: Product;
}
