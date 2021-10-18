import { ReceiptProduct } from './../models/receiptProduct.entity';
import { data } from './../seed/seed';
import { Option } from './../models/option.entity';
import { User } from './../models/user.entity';
import { Receipt } from './../models/receipt.entity';
import { ProductOption } from './../models/productOption.entity';
import { NextFunction, Request, Response } from 'express';
import { getManager, getRepository, In } from 'typeorm';
import { Product } from '../models/product.entity';
import { CommonConfig } from '.';
import { OptionValue } from '../models/optionValue.entity';
import { ReceiptOptionProduct } from '../models/receiptOptionsProduct.entity';

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
      const { uId } = req.query;
      const request = JSON.parse(req.body.data);
      let total = 0;
      let receipt;

      const user = await getManager().findOne(User, { where: { id: uId } });
      request.forEach((item: any) => {
        total += item?.quanlity * item?.unitPrice;
      });

      if (user) {
        receipt = new Receipt();
        receipt.user = user;
        receipt.totalPrice = total;
        await getManager().save(receipt);
      }
      const dataTemp = [];

      for (const data of request) {
        const receiptProduct = new ReceiptProduct();
        if (receipt) {
          receiptProduct.receipt = receipt;
          receiptProduct.pruductName = data.name;
          receiptProduct.quanlity = data.quanlity;
          receiptProduct.unitPrice = data.unitPrice;
          await getManager().save(receiptProduct);
        }

        const options = [];
        const variants = [];
        for (const opt in data.option) {
          options.push(opt);
          for (const dt of data.option[opt]) {
            variants.push(dt);
          }
        }
        const optionsEntity = await getManager().find(Option, { where: { id: In(options) } });
        const variantEntity = await getManager().find(OptionValue, { where: { id: In(variants) } });
        for (const id in data.option) {
          for (const dt of data.option[id]) {
            dataTemp.push({
              productName: data.name,
              productOptionName: optionsEntity.find((item) => item.id === parseInt(id))?.name,
              productOptionValue: variantEntity.find((item) => item.id === parseInt(dt))?.name,
              receiptProduct: receiptProduct,
            });
          }
        }
      }
      await getManager().save(ReceiptOptionProduct, dataTemp);

      res.status(200).json({
        success: true,
        message: 'Tạo hóa đơn thành công',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Tạo hóa đơn thất bại',
      });
    }
  }
}
const receiptController = new ReceiptController();
export default receiptController;
