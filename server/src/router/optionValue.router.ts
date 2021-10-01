import { Router } from "express";
import optionValueController from "../controllers/optionValue.controller";
// import { ValidateData } from "../middleware/commonMiddleware";

const router = Router();


router.post('/', optionValueController.insertOptionValue)

router.put('/:id', optionValueController.updateOptionValue)

router.delete('/:id', optionValueController.deleteOptionValue)

export default router;
