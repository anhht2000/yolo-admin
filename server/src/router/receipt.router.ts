import { Router } from 'express';
import receiptController from '../controllers/receipt.controller';

const router = Router();

router.get('/', receiptController.getAllReceipt);
// router.post('/sign-up', createUpdateRuleUser, ValidateData, userController.createUser);
// router.post('/log-in', userController.logIn);
// router.put('/:userId', checkToken, createUpdateRuleUser, ValidateData, userController.updateUser);
// router.delete('/:userId', checkToken, userController.deleteUser);
// router.get('/get', userController.searchUser);

export default router;
