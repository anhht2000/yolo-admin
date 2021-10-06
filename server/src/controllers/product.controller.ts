import { OptionValue } from './../models/optionValue.entity';
import { NextFunction, Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Product } from '../models/product.entity';
import { ProductImg } from '../models/productImg.entity';
import { ProductOption } from './../models/productOption.entity';
import { CommonConfig } from './index';
import { Option } from '../models/option.entity';

class ProductController {
  //get
  public async getProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const { page, limit } = request.query;
      const _page = Number(page) || CommonConfig.DEFAUT_PAGE;
      const _limit = Number(limit) || CommonConfig.DEFAUT_PERPAGE;
      const count = await getRepository(Product).createQueryBuilder('product').getCount();
      const _total = Math.ceil(count / _limit);
      const productList = await getRepository(Product)
        .createQueryBuilder('product')
        .skip((_page - 1) * _limit)
        .take(_limit)
        .getMany();

      return response.status(200).json({
        success: true,
        message: 'Get list successfully',
        data: productList,
        page: {
          totalPage: _total,
          perPage: _limit,
          currentPage: _page,
        },
      });
    } catch (error) {
      return response.status(500).json({ success: false, message: 'Get list fail' });
    }
  }
  //add
  public async addProduct(request: Request, response: Response, next: NextFunction) {
    console.log(request.files);
    console.log(request.body);
    response.send('success');
    // try {
    //   const { name, description, price } = request.body;
    //   const product = await getRepository(Product)
    //     .createQueryBuilder('product')
    //     .insert()
    //     .into(Product)
    //     .values({
    //       name,
    //       description,
    //       price,
    //     })
    //     .execute();

    //   return response.status(200).json({
    //     success: true,
    //     message: 'Add successfully',
    //     data: { name, description, price, ...product.generatedMaps[0] },
    //   });
    // } catch (error) {
    //   return response.status(500).json({ success: true, message: error });
    // }
  }
  //update
  public async updateProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const { name, description, price } = request.body;
      await getRepository(Product)
        .createQueryBuilder('product')
        .update(Product)
        .set({
          name,
          description,
          price,
        })
        .where('id = :id', { id: id })
        .execute();
      const data = await getRepository(Product)
        .createQueryBuilder('product')
        .where('id = :id', { id: id })
        .getOne();

      return response.status(200).json({
        success: true,
        message: 'Get list successfully',
        data: data,
      });
    } catch (error) {
      return response.status(500).json({ success: false, message: error });
    }
  }
  //delete
  public async deleteProduct(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params;
    const queryRunner = getConnection().createQueryRunner();
    queryRunner.startTransaction();
    try {
      await queryRunner.manager.delete(ProductOption, { product: id });
      await queryRunner.manager.delete(ProductImg, { product: id });
      await queryRunner.manager.delete(Product, { id: id });
      queryRunner.commitTransaction();

      response.json({ success: true, message: 'Delete successfully' });
    } catch (error) {
      queryRunner.rollbackTransaction();
      response.json({ success: false, message: 'Delete fail' });
    } finally {
      queryRunner.release();
      return;
    }
  }
  //search and filter
  public async searchProduct(request: Request, response: Response, next: NextFunction) {
    const { page, limit, search, filter } = request.query;
    const _page = Number(page) || CommonConfig.DEFAUT_PAGE;
    const _limit = Number(limit) || CommonConfig.DEFAUT_PERPAGE;
    const _search = String(search) || CommonConfig.DEFAUT_SEARCH;
    if (!filter) {
      try {
        const count = await getRepository(Product)
          .createQueryBuilder('product')
          .where('product.name like :name', { name: `%${_search}%` })
          .getCount();
        const _total = Math.ceil(count / _limit);
        const productList = await getRepository(Product)
          .createQueryBuilder('product')
          .skip((_page - 1) * _limit)
          .take(_limit)
          .where('product.name like :name', { name: `%${_search}%` })
          .getMany();

        return response.status(200).json({
          success: true,
          message: 'search successfully',
          data: productList,
          page: {
            totalPage: _total,
            perPage: _limit,
            currentPage: _page,
          },
        });
      } catch (error) {
        return response.status(500).json({ success: false, message: error });
      }
    } else {
      try {
        const dataOption = String(filter).split(',');
        const count = await getRepository(Product)
          .createQueryBuilder('product')
          .select('product.id', 'id')
          .addSelect('product.name', 'name')
          .addSelect('product.price', 'price')
          .addSelect('productOption.optionId', 'optionId')
          .addSelect('productImg.imgPath', 'imgPath')
          .addSelect('optionValue.name', 'Value')
          .addSelect('option.name', 'option')
          .leftJoin(ProductImg, 'productImg', 'product.id = productImg.productId')
          .leftJoin(ProductOption, 'productOption', 'product.id = productOption.productId')
          .leftJoin(Option, 'option', 'productOption.optionId = option.id')
          .leftJoin(OptionValue, 'optionValue', 'optionValue.optionId = option.id')
          .skip((_page - 1) * _limit)
          .take(_limit)
          .where('optionValue.name like :value1', { value1: dataOption[0] })
          .orWhere('optionValue.name like :value2', { value2: dataOption[1] })
          .orWhere('optionValue.name like :value3', { value3: dataOption[2] })
          .orWhere('optionValue.name like :value4', { value4: dataOption[3] })
          .orWhere('optionValue.name like :value5', { value5: dataOption[4] })
          .orWhere('optionValue.name like :value6', { value6: dataOption[5] })
          .getCount();

        const productList = await getRepository(Product)
          .createQueryBuilder('product')
          .select('product.id', 'id')
          .addSelect('product.name', 'name')
          .addSelect('product.price', 'price')
          .addSelect('productOption.optionId', 'optionId')
          .addSelect('productImg.imgPath', 'imgPath')
          .addSelect('optionValue.name', 'Value')
          .addSelect('option.name', 'option')
          .leftJoin(ProductImg, 'productImg', 'product.id = productImg.productId')
          .leftJoin(ProductOption, 'productOption', 'product.id = productOption.productId')
          .leftJoin(Option, 'option', 'productOption.optionId = option.id')
          .leftJoin(OptionValue, 'optionValue', 'optionValue.optionId = option.id')
          .skip((_page - 1) * _limit)
          .take(_limit)
          .where('optionValue.name like :value1', { value1: dataOption[0] })
          .orWhere('optionValue.name like :value2', { value2: dataOption[1] })
          .orWhere('optionValue.name like :value3', { value3: dataOption[2] })
          .orWhere('optionValue.name like :value4', { value4: dataOption[3] })
          .orWhere('optionValue.name like :value5', { value5: dataOption[4] })
          .orWhere('optionValue.name like :value6', { value6: dataOption[5] })
          .getRawMany();

        const _total = Math.ceil(count / _limit);

        return response.status(200).json({
          success: true,
          message: 'Filter successfully',
          data: productList,
          page: {
            totalPage: _total,
            perPage: _limit,
            currentPage: _page,
          },
        });
      } catch (error) {
        return response.status(500).send({ success: false, message: 'Filter fail' });
      }
    }
  }
}
const productController = new ProductController();
export default productController;
