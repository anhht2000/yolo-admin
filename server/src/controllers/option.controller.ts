import { NextFunction, Request, Response } from "express";
import { getConnection, getRepository } from "typeorm";
import { Option } from "../models/option.entity";
import { validationResult } from 'express-validator';
import { OptionValue } from "../models/optionValue.entity";
class OptionController {
  public async getAllOption(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || 5;
      const page = parseInt(req.query.page as string) || 1;
      const optionRep = await getRepository(Option)
                              .createQueryBuilder('option')
                              .skip((page-1) * limit)
                              .take(limit)
                              .getMany();

      const optionRepPage = await getRepository(Option)
                                  .createQueryBuilder('option')
                                  .getCount();

      res.send({
        data: optionRep,
        page: {
          totalPage:Math.ceil(optionRepPage / limit),
          perPage: limit,
          currentPage: page
        }
      });
    } catch (error) {
      res.send({message: error});
    }
  }
  public async createOption(req: Request, res: Response, next: NextFunction) {
    try {
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }

      const { name } = req.body as { name: string };
      const optionRep = await getRepository(Option)
                                .createQueryBuilder('option')
                                .insert()
                                .values({name: name})
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
                              .createQueryBuilder('option')
                              .where('option.id = :id',{id: id})
                              .getOne();

      res.send({ data: optionRepo });
    } catch (error) {
      res.send(error);
    }

  }
  public async deleteOption(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params as { id: string };

    const queryRunner = getConnection().createQueryRunner();
    queryRunner.startTransaction()
    try {
      await queryRunner.manager.delete(OptionValue, { option: id })
      await queryRunner.manager.delete(Option, { id: id })
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
      const error = validationResult(req)
      if (!error.isEmpty()) {
        return res.status(400).json({ errors: error.array() });
      }

      const { name } = req.body as { name: string };
     await getRepository(Option)
        .createQueryBuilder('option')
        .update()
        .set({ name: name })
        .where('option.id = :id',{id: id})
        .execute();

      const optionRep = await getRepository(Option)
                        .createQueryBuilder('option')
                        .where('option.id = :id',{id: id})
                        .getOne();
      res.send({ data: optionRep });
    } catch (error) {
      res.send({ message: error });
    }
  }
}

const optionController = new OptionController();
export default optionController;
