import { Receipt } from './../models/receipt.entity';
import { ProductOption } from './../models/productOption.entity';
import { NextFunction, Request, Response } from 'express';
import { getManager, getRepository } from 'typeorm';
import { Product } from '../models/product.entity';

class ReceiptController {
  public async getAllReceipt(req: Request, res: Response, next: NextFunction) {
    try {
      const { uId } = req.query;
      const data = await getRepository(Receipt)
        .createQueryBuilder('Receipt')
        .leftJoinAndSelect('Receipt.user', 'User')
        .leftJoinAndSelect('Receipt.receiptProducts', 'ReceiptProducts')
        .leftJoinAndSelect('ReceiptProducts.receiptOptionProducts', 'ReceiptOptionProducts')
        .where('User.id = :Uid', {
          Uid: uId,
        })
        .getMany();

      res.status(200).json({
        success: true,
        message: 'Lấy hóa đơn thành công',
        data,
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
      // const { productId,productName,quantity,unitPrice,totalPrice } = req.body;
      const data = await getRepository(Receipt)
        .createQueryBuilder('Receipt')
        .leftJoinAndSelect('Receipt.user', 'User')
        .leftJoinAndSelect('Receipt.receiptProducts', 'ReceiptProducts')
        .leftJoinAndSelect('ReceiptProducts.receiptOptionProducts', 'ReceiptOptionProducts')
        .where('User.id = :Uid', {
          Uid: uId,
        })
        .getMany();

      res.status(200).json({
        success: true,
        message: 'Lấy hóa đơn thành công',
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Lấy hóa đơn thất bại',
      });
    }
  }
}
const receiptController = new ReceiptController();
export default receiptController;