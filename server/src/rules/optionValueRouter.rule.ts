import { body } from "express-validator";

export const createRuleOptionValue = [
  body("name").isString().withMessage("Name nhập vào phải là ký tự"),
];

export const UpdateRuleOptionValue = [
  body("name").isString().withMessage("Name nhập vào phải là ký tự"),
];
