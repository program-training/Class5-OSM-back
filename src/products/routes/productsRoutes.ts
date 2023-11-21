import express from "express";
import {
  handleGetProduct,
  handleGetProducts,
} from "../controllers/productsControllers";
const router = express.Router();

router.get("/", handleGetProducts);
router.get("/:id", handleGetProduct);

export default router;
