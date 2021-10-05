import { ProductImg } from './../models/productImg.entity';
import { OptionValue } from './../models/optionValue.entity';
import { NextFunction, Request, Response } from 'express';
import { getConnection, getRepository } from 'typeorm';
import { Product } from '../models/product.entity';
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
      const count = await getRepository(Product).createQueryBuilder('Product').getCount();
      const _total = Math.ceil(count / _limit);
      const productList = await getRepository(Product)
        .createQueryBuilder('Product')
        .leftJoinAndSelect('Product.productOption', 'ProductOption')
        .leftJoinAndSelect('ProductOption.option', 'option')
        .leftJoinAndSelect('ProductOption.optionValue', 'optionValue')
        .leftJoinAndSelect('Product.productImg', 'productImg')
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

  public async getOneProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const { productId } = request.params;
      const product = await getRepository(Product)
        .createQueryBuilder('Product')
        .leftJoinAndSelect('Product.productOption', 'ProductOption')
        .leftJoinAndSelect('ProductOption.option', 'option')
        .leftJoinAndSelect('ProductOption.optionValue', 'optionValue')
        .leftJoinAndSelect('Product.productImg', 'productImg')
        .where('Product.id = :productId', { productId: productId })
        .getOne();

      return response.status(200).json({
        success: true,
        message: 'Get product successfully',
        data: product,
      });
    } catch (error) {
      return response.status(500).json({ success: false, message: 'Get product fail' });
    }
  }
  //add
  public async addProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const { name, description, price, size, color } = request.body;
      let product = await getRepository(Product)
        .createQueryBuilder('product')
        .insert()
        .into(Product)
        .values({
          name,
          description,
          price,
        })
        .execute();
      const productId = product.generatedMaps[0].id;
      const data = await getRepository(Product)
        .createQueryBuilder('product')
        .where('id = :id', { id: productId })
        .getOne();

      if (request.files) {
        request.files = request.files as Array<any>;
        request.files.forEach(async (item, index) => {
          const productImg = await getRepository(ProductImg)
            .createQueryBuilder('productImg')
            .insert()
            .into(ProductImg)
            .values({
              imgPath: item.filename,
              name: item.originalname,
              product: data,
            })
            .execute();
        });
      }
      const dtsize = await getRepository(Option).createQueryBuilder().where("name = 'size'").getOne();
      size.split(',').forEach(async (e: string) => {
        const sizeT = await getRepository(OptionValue)
          .createQueryBuilder('OptionValue')
          .where('name = :nameSize', { nameSize: `${e}` })
          .getOne();
        await getRepository(ProductOption)
          .createQueryBuilder('ProductOption')
          .insert()
          .into(ProductOption)
          .values({
            product: data,
            option: dtsize,
            optionValue: sizeT,
          })
          .execute();
      });

      const dtcolor = await getRepository(Option).createQueryBuilder().where("name = 'color'").getOne();
      color.split(',').forEach(async (e: string) => {
        const colorT = await getRepository(OptionValue)
          .createQueryBuilder('OptionValue')
          .where('name = :nameColor', { nameColor: `${e}` })
          .getOne();
        await getRepository(ProductOption)
          .createQueryBuilder('ProductOption')
          .insert()
          .into(ProductOption)
          .values({
            product: data,
            option: dtcolor,
            optionValue: colorT,
          })
          .execute();
      });

      return response.status(200).json({
        success: true,
        message: 'Add successfully',
      });
    } catch (error) {
      return response.status(500).json({ success: false, message: error });
    }
  }
  //update
  public async updateProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params;
      const { name, description, price, size, color } = request.body;

      await getRepository(Product)
        .createQueryBuilder('product')
        .update(Product)
        .set({
          name,
          description,
          price,
        })
        .where('id = :idProduct', { idProduct: id })
        .execute();
      const data = await getRepository(Product)
        .createQueryBuilder('product')
        .where('id = :idProduct', { idProduct: id })
        .getOne();

      await getRepository(ProductImg)
        .createQueryBuilder('productImg')
        .leftJoinAndSelect('productImg.product', 'product')
        .delete()
        .from(ProductImg)
        .where('product.id = :idT', { idT: id })
        .execute();

      if (request.files) {
        request.files = request.files as Array<any>;
        request.files.forEach(async (item, index) => {
          const productImg = await getRepository(ProductImg)
            .createQueryBuilder('productImg')
            .insert()
            .into(ProductImg)
            .values({
              imgPath: item.filename,
              name: item.originalname,
              product: data,
            })
            .execute();
        });
      }

      await getRepository(ProductOption)
        .createQueryBuilder('ProductOption')
        .leftJoinAndSelect('ProductOption.product', 'product')
        .delete()
        .from(ProductOption)
        .where('product.id = :idP', { idP: id })
        .execute();

      const dtsize = await getRepository(Option).createQueryBuilder().where("name = 'size'").getOne();
      size.split(',').forEach(async (e: string) => {
        const sizeT = await getRepository(OptionValue)
          .createQueryBuilder('OptionValue')
          .where('name = :nameSizeU', { nameSizeU: `${e}` })
          .getOne();
        await getRepository(ProductOption)
          .createQueryBuilder('ProductOption')
          .insert()
          .into(ProductOption)
          .values({
            product: data,
            option: dtsize,
            optionValue: sizeT,
          })
          .execute();
      });

      const dtcolor = await getRepository(Option).createQueryBuilder().where("name = 'color'").getOne();
      color.split(',').forEach(async (e: string) => {
        const colorT = await getRepository(OptionValue)
          .createQueryBuilder('OptionValue')
          .where('name = :nameColorU', { nameColorU: `${e}` })
          .getOne();
        await getRepository(ProductOption)
          .createQueryBuilder('ProductOption')
          .insert()
          .into(ProductOption)
          .values({
            product: data,
            option: dtcolor,
            optionValue: colorT,
          })
          .execute();
      });

      return response.status(200).json({
        success: true,
        message: 'Update successfully',
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
          .createQueryBuilder('Product')
          .leftJoinAndSelect('Product.productOption', 'ProductOption')
          .leftJoinAndSelect('ProductOption.option', 'option')
          .leftJoinAndSelect('ProductOption.optionValue', 'optionValue')
          .leftJoinAndSelect('Product.productImg', 'productImg')
          .skip((_page - 1) * _limit)
          .take(_limit)
          .where('Product.name like :name', { name: `%${_search}%` })
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
          .createQueryBuilder('Product')
          .leftJoinAndSelect('Product.productOption', 'ProductOption')
          .leftJoinAndSelect('ProductOption.option', 'option')
          .leftJoinAndSelect('ProductOption.optionValue', 'optionValue')
          .leftJoinAndSelect('Product.productImg', 'productImg')
          .skip((_page - 1) * _limit)
          .take(_limit)
          .where('optionValue.name like :value1', { value1: dataOption[0] })
          .orWhere('optionValue.name like :value2', { value2: dataOption[1] })
          .orWhere('optionValue.name like :value3', { value3: dataOption[2] })
          .orWhere('optionValue.name like :value4', { value4: dataOption[3] })
          .orWhere('optionValue.name like :value5', { value5: dataOption[4] })
          .orWhere('optionValue.name like :value6', { value6: dataOption[5] })
          .getCount();
        const productList = getRepository(Product)
          .createQueryBuilder('Product')
          .leftJoinAndSelect('Product.productOption', 'ProductOption')
          .leftJoinAndSelect('ProductOption.option', 'option')
          .leftJoinAndSelect('ProductOption.optionValue', 'optionValue')
          .leftJoinAndSelect('Product.productImg', 'productImg')
          .skip((_page - 1) * _limit)
          .take(_limit)
          .where('optionValue.name like :value1', { value1: dataOption[0] })
          .orWhere('optionValue.name like :value2', { value2: dataOption[1] })
          .orWhere('optionValue.name like :value3', { value3: dataOption[2] })
          .orWhere('optionValue.name like :value4', { value4: dataOption[3] })
          .orWhere('optionValue.name like :value5', { value5: dataOption[4] })
          .orWhere('optionValue.name like :value6', { value6: dataOption[5] })
          .getMany();
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
  public async sortProduct(request: Request, response: Response, next: NextFunction) {
    try {
      const { sortBy, page, limit, order } = request.query;
      const _sortBy = String(sortBy);
      const _order = (order === '1' ? 'DESC' : 'ASC') || 'ASC';
      const _page = Number(page) || CommonConfig.DEFAUT_PAGE;
      const _limit = Number(limit) || CommonConfig.DEFAUT_PERPAGE;
      const count = await getRepository(Product).createQueryBuilder('Product').getCount();
      const _total = Math.ceil(count / _limit);
      const product = await getRepository(Product)
        .createQueryBuilder('Product')
        .leftJoinAndSelect('Product.productOption', 'ProductOption')
        .leftJoinAndSelect('ProductOption.option', 'option')
        .leftJoinAndSelect('ProductOption.optionValue', 'optionValue')
        .leftJoinAndSelect('Product.productImg', 'productImg')
        .orderBy(`Product.${_sortBy}`, _order)
        .skip((_page - 1) * _limit)
        .take(_limit)
        .getMany();

      return response.status(200).json({
        success: true,
        message: 'Get sort successfully',
        data: product,
        page: {
          totalPage: _total,
          perPage: _limit,
          currentPage: _page,
        },
      });
    } catch (error) {
      return response.status(500).json({ success: false, message: 'Get sort fail' });
    }
  }
}
const productController = new ProductController();
export default productController;
