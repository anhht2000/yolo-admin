import { body } from 'express-validator';
import { ValidateData } from '../middleware/commonMiddleware';

export const createUpdateRuleProduct = [
  body('name')
    .isString()
    .withMessage('Tên nhập vào phải là ký tự')
    .notEmpty()
    .withMessage('Bạn phải nhập tên sản phẩm'),
  body('price')
    .isString()
    .withMessage('Giá phải là kí tự vd: 123456...')
    .notEmpty()
    .withMessage('Bạn phải nhập giá sản phẩm'),
  body('description')
    .isString()
    .withMessage('Miêu tả phải là kí tự ')
    .notEmpty()
    .withMessage('Bạn phải nhập miêu tả'),
  ValidateData,
];
