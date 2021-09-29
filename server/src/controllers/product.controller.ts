import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.entity";

class ProductController {
  //get
  async getProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const { _page, _limit } = request.query;
      const page = Number(_page) || 1;
      const limit = Number(_limit) || 10;
      const count = await getRepository(Product)
        .createQueryBuilder("product")
        .getCount();
      const _total = Math.ceil(count / limit);
      const productList = await getRepository(Product)
        .createQueryBuilder("product")
        .skip((page - 1) * limit)
        .take(limit)
        .getMany();
      return response.status(200).json({
        data: productList,
        page: _total,
      });
    } catch (error) {
      response.status(500).json({ err: error });
    }
  }
  //add
}
const productController = new ProductController();
export default productController;
