import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.entity";

class ProductController {
  //get
  async getProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const { page, _limit } = request.query;
      const _page = Number(page) || 1;
      const limit = Number(_limit) || 5;
      const count = await getRepository(Product)
        .createQueryBuilder("product")
        .getCount();
      const _total = Math.ceil(count / limit);
      const productList = await getRepository(Product)
        .createQueryBuilder("product")
        .skip((_page - 1) * limit)
        .take(limit)
        .getMany();
      return response.status(200).json({
        data: productList,
        _: _total,
      });
    } catch (error) {
      response.status(500).json({ err: error });
    }
  }
  //add
}
const productController = new ProductController();
export default productController;
