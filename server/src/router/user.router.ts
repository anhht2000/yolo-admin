import { createUpdateRuleUser } from './../rules/userRouter.rule';
import { Router } from 'express';
import userController from '../controllers/user.controller';
import { ValidateData } from '../middleware/commonMiddleware';

const router = Router();

router.get('/', userController.getAllUser);
router.post('/', createUpdateRuleUser, ValidateData, userController.createUser);
router.put('/:userId', createUpdateRuleUser, ValidateData, userController.updateUser);
router.delete('/:userId', userController.deleteUser);

export default router;
