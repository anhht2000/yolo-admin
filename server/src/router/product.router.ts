import { createUpdateRuleProduct } from "./../rules/productRouter.rule";
import { Router } from "express";
import { body, check } from "express-validator";
import productController from "../controllers/product.controller";
import { ValidateData } from "../middleware/commonMiddleware";

const router = Router();

router.get("/get", productController.getProduct);
router.post(
  "/add",
  createUpdateRuleProduct,
  ValidateData,
  productController.addProduct
);
router.put(
  "/edit/:id",
  createUpdateRuleProduct,
  ValidateData,
  productController.updateProduct
);
router.delete("/delete/:id", productController.deleteProduct);
router.get("/search", productController.searchProduct);

export default router;
