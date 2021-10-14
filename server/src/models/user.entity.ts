import { OneToMany } from 'typeorm';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Common } from './helper/common.helper';
import { Receipt } from './receipt.entity';

@Entity()
export class User extends Common {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  password: string;

  @Column()
  address: string;

  @Column()
  phone: string;

  @Column({ default: true })
  active: boolean;

  @OneToMany(() => Receipt, (receipt: any) => receipt.user)
  receipts: Receipt[];
}
