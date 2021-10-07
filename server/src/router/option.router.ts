import { Router } from "express";
import optionController from "../controllers/option.controller";
import optionValueController from "../controllers/optionValue.controller";
import { ValidateData } from "../middleware/commonMiddleware";
import { createUpdateRuleOption } from "../rules/optionRouter.rule";
const router = Router();

router.get('/', optionController.getAllOption)

router.get('/all', optionController.getAllOptionWithVariant)

router.post('/', createUpdateRuleOption, ValidateData, optionController.createOption)

router.get('/:id', optionController.getOneOption)

router.put('/:id', createUpdateRuleOption, ValidateData, optionController.updateOption)

router.delete('/:id', optionController.deleteOption)

router.post("/:optionId/variant", optionValueController.insertOptionValue)

router.delete("/:optionId/variant/:id", optionValueController.deleteOptionValue)

router.put("/:optionId/variant/:id", optionValueController.updateOptionValue)

export default router;
