import { NextFunction, Request, Response } from "express";
import { getConnection, getManager, getRepository } from "typeorm";
import { Option } from "../models/option.entity";
import { OptionValue } from "../models/optionValue.entity";
import { ProductOption } from "../models/productOption.entity";
class OptionValueController {
  public async insertOptionValue(req: Request, res: Response, next: NextFunction) {
    try {
      const { optionId } = req.params as { optionId : string }
      const { name } = req.body as { name: string };

      const optionRepo = await getManager().findOne(Option, optionId)

      const optionValueRepo = await getManager()
        .insert(OptionValue, { name: name, option: optionRepo })

      const result = await getManager().findOne(OptionValue, optionValueRepo?.identifiers[0].id)
      res.send({ data: result })
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
