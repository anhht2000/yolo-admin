import { Router } from "express";
import productController from "../controllers/product.controller";

const router = Router();

router.get("/get", productController.getProduct);

export default router;
