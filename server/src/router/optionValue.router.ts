import { Router } from "express";
import optionController from "../controllers/option.controller";
import { ValidateData } from "../middleware/commonMiddleware";
import { createUpdateRuleOption } from "../rules/optionRouter.rule";

const router = Router();

router.get('/', optionController.getAllOption)

router.post('/', createUpdateRuleOption, ValidateData, optionController.createOption)

router.get('/:id', optionController.getOneOption)

router.put('/:id', createUpdateRuleOption, ValidateData, optionController.updateOption)

router.delete('/:id', optionController.deleteOption)

export default router;
