import { Product_Option } from "./product.option.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product_Img } from "./product.img.entity";
import { Common } from "./helper/common.helper";

@Entity()
export class Product extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: string;

  @OneToMany(() => Product_Img, (product_img) => product_img.product)
  product_img: Product_Img[];

  @OneToMany(() => Product_Option, (product_option) => product_option.product)
  product_option: Product_Option[];
}
