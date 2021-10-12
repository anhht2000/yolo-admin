import { Router } from 'express';
import receiptController from '../controllers/receipt.controller';

const router = Router();

router.get('/', receiptController.getAllReceipt);
router.post('/', receiptController.createReceipt);
// router.post('/log-in', userController.logIn);
// router.put('/:userId', checkToken, createUpdateRuleUser, ValidateData, userController.updateUser);
// router.delete('/:userId', checkToken, userController.deleteUser);
// router.get('/get', userController.searchUser);

export default router;
