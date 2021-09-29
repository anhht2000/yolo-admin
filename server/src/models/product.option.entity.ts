import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Option } from "./option.entity";
import { Option_Value } from "./option_value.entity";
import { Product } from "./product.entity";
import { Product_Img } from "./product.img.entity";

@Entity()
export class Product_Option {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.product_option)
  product: Product;

  @ManyToOne(() => Option, (option) => option.product_options)
  option: Option;

  @ManyToOne(() => Option_Value, (option_value) => option_value.product_options)
  option_value: Option_Value;
}
