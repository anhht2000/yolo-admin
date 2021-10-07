import { Router } from 'express';
import productController from '../controllers/product.controller';
import checkToken from '../middleware/checktokenMiddleware';
import { ValidateData } from '../middleware/commonMiddleware';
import { upload } from '../middleware/multerMiddleware';
import { createUpdateRuleProduct } from './../rules/productRouter.rule';

const router = Router();

router.get('/', productController.getProduct);
router.post('/add', upload.array('allImg'), createUpdateRuleProduct, productController.addProduct);
router.put('/edit/:id', upload.array('allImg'), createUpdateRuleProduct, productController.updateProduct);
router.delete('/delete/:id', checkToken, productController.deleteProduct);
router.get('/search', productController.searchProduct);
router.get('/sort', productController.sortProduct);
router.get('/:productId', productController.getOneProduct);

export default router;
