import { body } from 'express-validator';

export const createUpdateRuleProduct = [
  body('name').isString().withMessage('Tên nhập vào phải là ký tự'),
  body('price').isString().withMessage('Giá phải là kí tự vd: 123456...'),
  body('description').isString().withMessage('Miêu tả phải là kí tự '),
];
