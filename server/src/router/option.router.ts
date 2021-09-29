import { Router } from "express";
import optionController from "../controllers/option.controller";
import { body } from 'express-validator';
import { ValidateData } from "../config/commonMiddleware";
const router = Router();

router.get('/', optionController.getAllOption)

router.post('/',[
  body('name').isString().withMessage('Input nhập vào phải là ký tự'),
], ValidateData ,optionController.createOption)

router.get('/:id',optionController.getOneOption)

router.put('/:id', [
  body('name').isString().withMessage('Input nhập vào phải là ký tự'),
], ValidateData,optionController.updateOption)

router.delete('/:id', optionController.deleteOption)

export default router;
