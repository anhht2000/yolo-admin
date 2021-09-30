import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Common } from "./helper/common.helper";
import { OptionValue } from "./optionValue.entity";
import { ProductOption } from "./productOption.entity";

@Entity()
export class Option extends Common{
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ProductOption, (productOption) => productOption.option)
  productOptions: ProductOption[];

  @OneToMany(()=> OptionValue, (optionValue)=> optionValue.option)
  optionValue: OptionValue[]
}
