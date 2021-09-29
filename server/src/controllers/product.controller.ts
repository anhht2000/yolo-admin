import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { getConnection, getRepository } from "typeorm";
import { Product } from "../models/product.entity";
import { Product_Img } from "./../models/product.img.entity";
import { Product_Option } from "./../models/product.option.entity";

class ProductController {
  //get
  public async getProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const { page, limit } = request.query;
      const _page = Number(page) || 1;
      const _limit = Number(limit) || 5;
      const count = await getRepository(Product)
        .createQueryBuilder("product")
        .getCount();
      const _total = Math.ceil(count / _limit);
      const productList = await getRepository(Product)
        .createQueryBuilder("product")
        .skip((_page - 1) * _limit)
        .take(_limit)
        .getMany();
      return response.status(200).json({
        data: productList,
        page: {
          totalPage: _total,
          perPage: _limit,
          currentPage: _page,
        },
      });
    } catch (error) {
      response.status(500).json({ err: error });
    }
  }
  //add
  public async addProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const error = validationResult(request);

      if (error.isEmpty()) {
        const { name, description, price } = request.body;
        const product = await getRepository(Product)
          .createQueryBuilder("product")
          .insert()
          .into(Product)
          .values({
            name,
            description,
            price,
          })
          .execute();
        return response.status(200).json({
          data: { name, description, price, ...product.generatedMaps[0] },
        });
      } else {
        response.status(500).json({
          err: error["errors"].map((e: any) => e.param + " " + e.msg),
        });
      }
    } catch (error) {
      response.status(500).json({ err: error });
    }
  }
  //update
  public async updateProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const error = validationResult(request);
      if (error.isEmpty()) {
        const { id } = request.params;
        const { name, description, price } = request.body;
        await getRepository(Product)
          .createQueryBuilder("product")
          .update(Product)
          .set({
            name,
            description,
            price,
          })
          .where("id = :id", { id: id })
          .execute();

        const data = await getRepository(Product)
          .createQueryBuilder("product")
          .where("id = :id", { id: id })
          .getOne();
        console.log("âtta", id, data);

        return response.status(200).json({
          data: data,
          message: "success",
        });
      } else {
        response.status(500).json({
          err: error["errors"].map((e: any) => e.param + " " + e.msg),
        });
      }
    } catch (error) {
      response.status(500).json({ err: error });
    }
  }
  //delete
  public async deleteProduct(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const error = validationResult(request);
    if (error.isEmpty()) {
      const { id } = request.params;
      const queryRunner = getConnection().createQueryRunner();
      queryRunner.startTransaction();
      try {
        await queryRunner.manager.delete(Product_Option, { product: id });
        await queryRunner.manager.delete(Product_Img, { product: id });
        await queryRunner.manager.delete(Product, { id: id });
        response.json({ mess: "delete success" });
        queryRunner.commitTransaction();
      } catch (error) {
        response.json({ mess: "delete fail" });
        queryRunner.rollbackTransaction();
      } finally {
        queryRunner.release();
      }
    }
  }
}
const productController = new ProductController();
export default productController;
