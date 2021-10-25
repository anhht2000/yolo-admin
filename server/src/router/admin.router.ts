import { Router } from 'express';
import adminController from '../controllers/admin.controller';
const router = Router();

router.post('/login', adminController.logIn);

export default router;
