import { body } from "express-validator";

export const createUpdateRuleOption = [
  body('name').isString().withMessage('Input nhập vào phải là ký tự'),
]
