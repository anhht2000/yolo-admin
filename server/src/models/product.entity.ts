import { ProductOption } from './productOption.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductImg } from './productImg.entity';
import { Common } from './helper/common.helper';

export enum EStatus {
  PENDING = 'pending',
  DRAFT = 'draft',
  PUBLISHED = 'published',
}

@Entity()
export class Product extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column({ type: 'enum', enum: EStatus, default: EStatus.DRAFT })
  status: EStatus;

  @Column()
  label: string;

  @OneToMany(() => ProductImg, (productImg) => productImg.product)
  productImg: ProductImg[];

  @OneToMany(() => ProductOption, (productOption) => productOption.product)
  productOption: ProductOption[];
}
