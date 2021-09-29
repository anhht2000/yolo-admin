import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { Product } from "../models/product.entity";

class ProductC {
  //get
  async getProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const productList = await getRepository(Product)
        .createQueryBuilder("product")
        .skip(2)
        .take(10)
        .getMany();
      return response.status(200).json({
        data: productList,
      });
    } catch (error) {
      response.status(500).json({ err: error });
    }
  }
  //add
}
const ProductController = new ProductC();
export default ProductController;
