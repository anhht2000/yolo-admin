import { body } from "express-validator";

export const createRuleOptionValue = [
  body("name").isString().withMessage("Name nhập vào phải là ký tự"),
  body("optionId").isNumeric().withMessage("OptionId phải là số tự nhiên")
];

export const UpdateRuleOptionValue = [
  body("name").isString().withMessage("Name nhập vào phải là ký tự"),
];
