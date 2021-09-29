import { Router } from "express";
import OptionController from "../controllers/option.controller";

const router = Router();

router.get('/', OptionController.getAllOption)
router.post('/')
router.get(':id', OptionController.getOneOption)
router.put('/:id', OptionController.updateOption)
router.delete('/:id', OptionController.deleteOption)

export default router;
