import { Router } from 'express';
import productController from '../controllers/product.controller';
import { ValidateData } from '../middleware/commonMiddleware';
import { upload } from '../middleware/multerMiddleware';
import { createUpdateRuleProduct } from './../rules/productRouter.rule';

const router = Router();

router.get('/get', productController.getProduct);
router.post('/add',
  upload.array('allImg'),
  // createUpdateRuleProduct,
  // ValidateData,
  productController.addProduct
);
router.put('/edit/:id', createUpdateRuleProduct, ValidateData, productController.updateProduct);
router.delete('/delete/:id', productController.deleteProduct);
router.get('/search', productController.searchProduct);

export default router;
