import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from "typeorm";

export abstract class Common {

  @CreateDateColumn()
  createdate: Date

  @UpdateDateColumn()
  updatedate: Date

  @DeleteDateColumn()
  deletedate: Date
}
