import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Common } from "./helper/common.helper";
import { Option } from "./option.entity";
import { Option_Value } from "./option_value.entity";
import { Product } from "./product.entity";
@Entity()
export class Product_Option extends Common{
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.product_option)
  product: Product;

  @ManyToOne(() => Option, (option) => option.product_options)
  option: Option;

  @ManyToOne(() => Option_Value, (option_value) => option_value.product_options)
  option_value: Option_Value;
}
