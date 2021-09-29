import { Router } from "express";
import ProductController from "../controllers/product.controller";

const router = Router();

router.get("/get", ProductController.getProduct);

export default router;
