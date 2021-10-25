import { Router } from 'express';
import adminController from '../controllers/admin.controller';
const router = Router();

router.post('/login', adminController.logIn);
router.post('/forget-password', adminController.forgetPass);

export default router;
