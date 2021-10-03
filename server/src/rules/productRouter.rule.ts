import { body } from "express-validator";

export const createUpdateRuleProduct = [
  body("title").isString().withMessage("Input nhập vào phải là ký tự"),
  body("price").isString().withMessage("Giá phải là kí tự vd: 123456...")
];
