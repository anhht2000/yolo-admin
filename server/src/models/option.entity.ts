import { Product_Option } from "./product.option.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product_Img } from "./product.img.entity";

@Entity()
export class Option {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product_Option, (product_option) => product_option.option)
  product_options: Product_Option[];
}
