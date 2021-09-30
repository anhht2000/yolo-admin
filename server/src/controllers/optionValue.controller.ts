import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { CommonConfig } from ".";
import { OptionValue } from "../models/optionValue.entity";

class OptionValueController {
  public async getAllOptionValueByOption(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = parseInt(req.query.limit as string) || CommonConfig.DEFAUT_PERPAGE;
      const page = parseInt(req.query.page as string) || CommonConfig.DEFAUT_PAGE;
      const search = req.query.search || '';

      const optionValueRepo = await getRepository(OptionValue)
        .createQueryBuilder('optionValue')
        .where('optionValue.name LIKE :name', { name: `%${search}%`})
        .getMany()

      const optionValueRepPage = await getRepository(Option)
        .createQueryBuilder("optionValue")
        .where('optionValue.name LIKE :name', { name: `%${search}%` })
        .getCount();

      res.send({
        data: optionValueRepo,
        page: {
          totalPage: Math.ceil(optionValueRepPage / limit),
          perPage: limit,
          currentPage: page,
        },
      });
    } catch (error) {
      res.send({ message: error });
    }
  }

  public async updateOptionValue(req: Request, res: Response, next: NextFunction) {

  }

  public async deleteOptionValue(req: Request, res: Response, next: NextFunction) {

  }
}

const optionValueController = new OptionValueController();
export default optionValueController;
