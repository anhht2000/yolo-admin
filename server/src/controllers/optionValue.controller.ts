import { NextFunction, Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Option } from "../models/option.entity";
import { OptionValue } from "../models/optionValue.entity";
import { ProductOption } from "../models/productOption.entity";
class OptionValueController {
  public async insertOptionValue(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, optionId } = req.body as { name: string, optionId: string};

      const optionRepo = await getRepository(Option)
        .createQueryBuilder('option')
        .where('option.id = :id', { id : optionId })
        .getOne()

      const optionValueRepo = await getConnection()
        .createQueryBuilder()
        .insert()
        .into(OptionValue)
        .values({ name: name, option: optionRepo })
        .execute();

      res.send({ data: optionValueRepo })
    } catch (error) {
      res.send({ error: error })
    }
  }

  public async updateOptionValue(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string }
      const { name } = req.body as { name: string }
      await getConnection()
        .createQueryBuilder()
        .update(OptionValue)
        .set({ name: name })
        .where("id = :id", { id: id })
        .execute();

      const optionValueRep = await getRepository(OptionValue)
        .createQueryBuilder("optionValue")
        .where("optionValue.id = :id", { id: id })
        .getOne();

      res.send({ data: optionValueRep })
    } catch (error) {
      res.send({ message: error})
    }
  }

  public async deleteOptionValue(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as { id: string };

    const queryRunner = getConnection().createQueryRunner();
    queryRunner.startTransaction();

    try {
      await queryRunner.manager.delete(ProductOption, { optionValue: id });
      await queryRunner.manager.delete(OptionValue, { id: id });
      res.send({ data: [] });
      queryRunner.commitTransaction();
    } catch (error) {
      res.send({ message: error });
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
}

const optionValueController = new OptionValueController();
export default optionValueController;
