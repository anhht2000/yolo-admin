import { Router } from "express";
import { body, check } from "express-validator";
import productController from "../controllers/product.controller";

const router = Router();

router.get("/get", productController.getProduct);
router.post(
  "/add",
  [
    body("name")
      .isString()
      .withMessage("Input phai la ky tu")
      .isLength({ min: 3 })
      .withMessage("Phai nhap it nhat 3 ky tu"),
    body("price")
      .isString()
      .withMessage("Price phai la ky tu")
      .isLength({ min: 3 })
      .withMessage("Phai nhap it nhat 3 ky tu"),
  ],
  productController.addProduct
);
router.put(
  "/edit/:id",
  [
    body("name")
      .isString()
      .withMessage("Input phai la ky tu")
      .isLength({ min: 3 })
      .withMessage("Phai nhap it nhat 3 ky tu"),
    body("price")
      .isString()
      .withMessage("Price phai la ky tu")
      .isLength({ min: 3 })
      .withMessage("Phai nhap it nhat 3 ky tu"),
  ],
  productController.updateProduct
);
router.delete("/delete/:id", productController.deleteProduct);

export default router;
