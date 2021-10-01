import { body } from 'express-validator';

export const createUpdateRuleUser = [
  body('username')
    .notEmpty()
    .withMessage('Bạn phải nhập username')
    .isEmail()
    .withMessage('Input nhập vào phải là email'),
  body('password').notEmpty().withMessage('Bạn phải nhập password'),
  body('address').notEmpty().withMessage('Bạn phải nhập address'),
  body('phone').notEmpty().withMessage('Bạn phải nhập phone'),
];
