import { Router } from 'express';
import receiptController from '../controllers/receipt.controller';

const router = Router();

router.get('/', receiptController.getAllReceipt);
router.post('/', receiptController.createReceipt);
router.get('/status/:receiptId', receiptController.changeStatus);

export default router;
