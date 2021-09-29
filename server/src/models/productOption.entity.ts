import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Common } from "./helper/common.helper";
import { Option } from "./option.entity";
import { OptionValue } from "./optionValue.entity";
import { Product } from "./product.entity";
@Entity()
export class ProductOption extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.productOption)
  product: Product;

  @ManyToOne(() => Option, (option) => option.productOptions)
  option: Option;

  @ManyToOne(() => OptionValue, (optionValue) => optionValue.productOptions)
  optionValue: OptionValue;
}
