import { createUpdateRuleUser } from './../rules/userRouter.rule';
import { Router } from 'express';
import userController from '../controllers/user.controller';
import { ValidateData } from '../middleware/commonMiddleware';
import checkToken from '../middleware/checktokenMiddleware';

const router = Router();

router.get('/', userController.getAllUser);
router.post('/sign-up', createUpdateRuleUser, ValidateData, userController.createUser);
router.post('/log-in', userController.logIn);
router.post('/forget-pass', userController.forgetPass);
router.post('/change-pass', userController.changePass);
router.put('/:userId', createUpdateRuleUser, ValidateData, userController.updateUser);
router.delete('/:userId', userController.deleteUser);
router.get('/get', userController.searchUser);

export default router;
