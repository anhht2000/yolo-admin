import { ReceiptProduct } from './../models/receiptProduct.entity';
import { data } from './../seed/seed';
import { Option } from './../models/option.entity';
import { User } from './../models/user.entity';
import { Receipt, statusReceipt } from './../models/receipt.entity';
import { ProductOption } from './../models/productOption.entity';
import { NextFunction, Request, Response } from 'express';
import { getManager, getRepository, In } from 'typeorm';
import { Product } from '../models/product.entity';
import { CommonConfig } from '.';
import { OptionValue } from '../models/optionValue.entity';
import { ReceiptOptionProduct } from '../models/receiptOptionsProduct.entity';
import * as jwt from 'jsonwebtoken';

class ReceiptController {
  public async getAllReceipt(req: Request, res: Response, next: NextFunction) {
    try {
      const { uId, page, limit } = req.query;
      const _page = Number(page) || CommonConfig.DEFAUT_PAGE;
      const _limit = Number(limit) || CommonConfig.DEFAUT_PERPAGE;

      let condition: any = {
        skip: (_page - 1) * _limit,
        take: _limit,
        relations: ['receiptProducts', 'user', 'receiptProducts.receiptOptionProducts'],
      };

      if (uId) {
        condition['where'] = {
          user: {
            id: uId,
          },
        };
      }

      let data = await getManager().findAndCount(Receipt, condition);
      let _total = Math.ceil(data[1] / _limit);

      res.status(200).json({
        success: true,
        message: 'Lấy hóa đơn thành công',
        data: data[0],
        page: {
          totalPage: _total,
          perPage: _limit,
          currentPage: _page,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lấy hóa đơn thất bại',
      });
    }
  }
  public async createReceipt(req: Request, res: Response, next: NextFunction) {
    try {
      const request = req.body;
      const authHeader: string = req.headers['authorization'] as string;
      const token = authHeader?.split(' ')[1] as string;
      const { sub } = await jwt.verify(token, String(process.env.SCREET_KEY));

      let total = 0;
      let receipt;

      const user = await getManager().findOne(User, { where: { username: sub } });
      request.forEach((item: any) => {
        total += item.quanlity * item.price;
      });

      if (user) {
        receipt = new Receipt();
        receipt.user = user;
        receipt.description = '';
        receipt.address = user.address;
        receipt.totalPrice = total;
        await getManager().save(receipt);
      }
      const dataTemp = [];

      for (const data of request) {
        const receiptProduct = new ReceiptProduct();
        // const product = await getManager().findOne(Product, { where: { id: data.id } });

        if (receipt) {
          receiptProduct.receipt = receipt;
          receiptProduct.pruductName = data.name;
          receiptProduct.quanlity = data.quanlity;
          receiptProduct.unitPrice = data.price;
          receiptProduct.productId = data.id;
          await getManager().save(receiptProduct);
        }

        const options = [];
        const variants = [];
        for (const opt in data.option) {
          options.push(opt);
          variants.push(data.option[opt]);
        }

        const optionsEntity = await getManager().find(Option, { where: { id: In(options) } });
        const variantEntity = await getManager().find(OptionValue, { where: { id: In(variants) } });
        for (const id in data.option) {
          // for (const dt of data.option[id]) {
          //   dataTemp.push({
          //     productName: data.name,
          //     productOptionName: optionsEntity.find((item) => item.id === parseInt(id))?.name,
          //     productOptionValue: variantEntity.find((item) => item.id === parseInt(dt))?.name,
          //     receiptProduct: receiptProduct,
          //   });
          // }
          dataTemp.push({
            productName: data.name,
            productOptionName: optionsEntity.find((item) => item.id === parseInt(id))?.name,
            productOptionValue: variantEntity.find((item) => item.id === parseInt(data.option[id]))?.name,
            receiptProduct: receiptProduct,
          });
        }
      }

      await getManager().save(ReceiptOptionProduct, dataTemp);

      res.status(200).json({
        success: true,
        message: 'Tạo hóa đơn thành công',
      });
    } catch (error) {
      console.log('err', error);

      res.status(500).json({
        success: false,
        message: 'Tạo hóa đơn thất bại',
      });
    }
  }
  public async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const { receiptId } = req.params;
      const { status } = req.query;
      await getManager().update(Receipt, receiptId, { status: status as statusReceipt });

      res.status(200).json({
        success: true,
        message: 'Sửa trạng thái hóa đơn thành công',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Sửa trạng thái hóa đơn thất bại',
      });
    }
  }
}
const receiptController = new ReceiptController();
export default receiptController;
