import { CommonConfig } from "./index";
import { NextFunction, Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Option } from "../models/option.entity";
import { OptionValue } from "../models/optionValue.entity";
class OptionController {
  public async getAllOption(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || CommonConfig.DEFAUT_PERPAGE;
      const page = parseInt(req.query.page as string) || CommonConfig.DEFAUT_PAGE;
      const search = req.query.search || '';

      const optionRep = await getRepository(Option)
        .createQueryBuilder("option")
        .skip((page - 1) * limit)
        .take(limit)
        .where('option.name LIKE :name', { name: `%${search}%` })
        .getMany();

      const optionRepPage = await getRepository(Option)
        .createQueryBuilder("option")
        .where('option.name LIKE :name', { name: `%${search}%` })
        .getCount();

      res.send({
        data: optionRep,
        page: {
          totalPage: Math.ceil(optionRepPage / limit),
          perPage: limit,
          currentPage: page,
        },
      });
    } catch (error) {
      res.send({ message: error });
    }
  }
  public async createOption(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.body as { name: string };
      const optionRep = await getRepository(Option)
        .createQueryBuilder("option")
        .insert()
        .values({ name: name })
        .execute();

      res.send({ data: optionRep });
    } catch (error) {
      res.send({ message: error });
    }
  }

  public async getOneOption(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params as { id: string };
      const optionRepo = await getRepository(Option)
        .createQueryBuilder("option")
        .where("option.id = :id", { id: id })
        .getOne();

      res.send({ data: optionRepo });
    } catch (error) {
      res.send(error);
    }
  }
  public async deleteOption(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as { id: string };

    const queryRunner = getConnection().createQueryRunner();
    queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(OptionValue, { option: id });
      await queryRunner.manager.delete(Option, { id: id });
      res.send({ data: [] });
      queryRunner.commitTransaction();
    } catch (error) {
      res.send({ message: error });
      queryRunner.rollbackTransaction();
    } finally {
      queryRunner.release();
    }
  }
  public async updateOption(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as { id: string };
    try {
      const { name } = req.body as { name: string };
      await getRepository(Option)
        .createQueryBuilder("option")
        .update()
        .set({ name: name })
        .where("option.id = :id", { id: id })
        .execute();

      const optionRep = await getRepository(Option)
        .createQueryBuilder("option")
        .where("option.id = :id", { id: id })
        .getOne();

      return res.send({ data: optionRep });
    } catch (error) {
      return res.send({ message: error });
    }
  }
}

const optionController = new OptionController();
export default optionController;
