import { Router } from "express";
import optionValueController from "../controllers/optionValue.controller";
import { ValidateData } from "../middleware/commonMiddleware";
import { createRuleOptionValue, UpdateRuleOptionValue } from "../rules/optionValueRouter.rule";
// import { ValidateData } from "../middleware/commonMiddleware";

const router = Router();


router.post('/', createRuleOptionValue, ValidateData, optionValueController.insertOptionValue)

router.put('/:id', UpdateRuleOptionValue, ValidateData, optionValueController.updateOptionValue)

router.delete('/:id', optionValueController.deleteOptionValue)

export default router;
