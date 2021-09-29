import { Product_Option } from "./product.option.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./helper/common.helper";
import { Option_Value } from "./option_value.entity";

@Entity()
export class Option extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Product_Option, (product_option) => product_option.option)
  product_options: Product_Option[];

  @OneToMany(()=> Option_Value, (option_value) => option_value.option)
  option_value: Option_Value[]
}
