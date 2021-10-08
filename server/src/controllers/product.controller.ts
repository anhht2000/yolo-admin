import { ProductImg } from './../models/productImg.entity';
import { OptionValue } from './../models/optionValue.entity';
import { NextFunction, Request, Response } from 'express';
import { getConnection, getManager, getRepository, In } from 'typeorm';
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

  public async getProductByPage(request: Request, response: Response, next: NextFunction) {
    try {
      const { id } = request.params as { id: string };

      const product = await getManager().findOne(Product, {
        relations: ['productImg'],
        where: { id: id },
      });

      const productOption = await getManager().find(ProductOption, {
        relations: ['option', 'optionValue'],
        where: { product: product },
      });

      let resValue: any[] = [];
      productOption.forEach((item) => {
        const check = resValue.find((data) => item.option.id === data.id);
        if (!check) {
          resValue.push({ ...item.option, OptionVal: [item.optionValue] });
        } else {
          resValue = resValue.map((temp) =>
            item.option.id === temp.id
              ? { ...temp, OptionVal: [...temp['OptionVal'], item.optionValue] }
              : temp
          );
        }
      });

      const resData = { ...product, option: resValue };

      return response.status(200).json({ success: true, data: resData });
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
    const processManager = await getConnection().createQueryRunner();
    processManager.startTransaction();
    try {
      const { name, description, price, option } = request.body;

      const product = new Product();
      product.name = name;
      product.price = price;
      product.description = description;
      await processManager.manager.save(product);

      const optionVariant = JSON.parse(option);
      const options = [];
      const variants = [];
      for (const id in optionVariant) {
        options.push(id);
        for (const data of optionVariant[id]) {
          variants.push(data);
        }
      }

      const optionsEntity = await getManager().find(Option, { where: { id: In(options) } });

      const variantEntity = await getManager().find(OptionValue, { where: { id: In(variants) } });

      const dataTemp = [];
      for (const id in optionVariant) {
        for (const data of optionVariant[id]) {
          dataTemp.push({
            product: product,
            option: optionsEntity.find((item) => item.id === parseInt(id)),
            optionValue: variantEntity.find((item) => item.id === parseInt(data)),
          });
        }
      }
      await processManager.manager.save(ProductOption, dataTemp);

      const filesImg = request.files as Express.Multer.File[];
      await processManager.manager.save(
        ProductImg,
        filesImg.map((item) => {
          return {
            product: product,
            name: item.originalname,
            imgPath: item.filename,
          };
        })
      );
      processManager.commitTransaction();
      response.status(200).json({
        success: true,
        message: 'Add successfully',
      });
    } catch (error) {
      processManager.rollbackTransaction();
      response.status(500).json({ success: false, message: error });
    } finally {
      processManager.release();
    }
  }
  //update
  public async updateProduct(request: Request, response: Response, next: NextFunction) {
    const processManager = await getConnection().createQueryRunner();
    processManager.startTransaction();
    try {
      const { name, description, price, option } = request.body;
      const { id } = request.params;

      const product = await processManager.manager.findOne(Product, id);
      if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        await processManager.manager.save(product);

        const optionVariant = JSON.parse(option);
        const options = [];
        const variants = [];
        for (const id in optionVariant) {
          options.push(id);
          for (const data of optionVariant[id]) {
            variants.push(data);
          }
        }

        const optionsEntity = await getManager().find(Option, { where: { id: In(options) } });

        const variantEntity = await getManager().find(OptionValue, { where: { id: In(variants) } });

        const dataTemp = [];
        for (const id in optionVariant) {
          for (const data of optionVariant[id]) {
            dataTemp.push({
              product: product,
              option: optionsEntity.find((item) => item.id === parseInt(id)),
              optionValue: variantEntity.find((item) => item.id === parseInt(data)),
            });
          }
        }
        await processManager.manager.delete(ProductOption, { product: id });
        await processManager.manager.save(ProductOption, dataTemp);

        await processManager.manager.delete(ProductImg, { product: id });
        const filesImg = request.files as Express.Multer.File[];
        await processManager.manager.save(
          ProductImg,
          filesImg.map((item) => {
            return {
              product: product,
              name: item.originalname,
              imgPath: item.filename,
            };
          })
        );
        processManager.commitTransaction();
        return response.status(200).json({
          success: true,
          message: 'Update successfully',
        });
      }

      return response.status(500).json({ success: false, message: "Product don't exited" });
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
