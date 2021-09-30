import { body } from "express-validator";

export const createUpdateRuleProduct = [
  body("name").isString().withMessage("Input nhập vào phải là ký tự"),
];
