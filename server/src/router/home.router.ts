import { Router } from 'express';
import homeController from '../controllers/home.controller';
const router = Router();
router.post('/', homeController.get);

export default router;
