import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from './helper/common.helper';
import { OptionValue } from './optionValue.entity';
import { ProductOption } from './productOption.entity';

export enum Emeta {
  TEXT = 'text',
  COLOR = 'color'
}
@Entity()
export class Option extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({type: 'enum', enum: Emeta, default: Emeta.TEXT})
  meta: string;

  @OneToMany(() => ProductOption, (productOption) => productOption.option)
  productOptions: ProductOption[];

  @OneToMany(() => OptionValue, (optionValue) => optionValue.option)
  optionValue: OptionValue[];
}
