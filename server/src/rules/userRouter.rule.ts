import { body } from 'express-validator';

export const createUpdateRuleUser = [
  body('username')
    .notEmpty()
    .withMessage('Bạn phải nhập tên người dùng ')
    .isEmail()
    .withMessage('Input nhập vào phải là email'),
  body('password').notEmpty().withMessage('Bạn phải nhập mật khẩu'),
  body('address').notEmpty().withMessage('Bạn phải nhập địa chỉ'),
  body('phone').notEmpty().withMessage('Bạn phải nhập số điện thoại'),
];
