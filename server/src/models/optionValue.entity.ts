import { ProductOption } from "./productOption.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./helper/common.helper";
import { Option } from "./option.entity";

@Entity()
export class OptionValue extends Common{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(
    () => ProductOption,
    (productOption) => productOption.optionValue
  )
  productOptions: ProductOption[];

  @ManyToOne(() => Option, (option)=> option.optionValue)
  option: Option
}
