import { Product_Option } from "./product.option.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Product_Img } from "./product.img.entity";
import { Common } from "./helper/common.helper";
import { Option } from "./option.entity";

@Entity()
export class Option_Value extends Common{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => Product_Option,
    (product_option) => product_option.option_value
  )
  product_options: Product_Option[];

  @ManyToOne(() => Option, (option)=> option.option_value)
  option: Option;
}
