import express from "express";
import {
  handleGetProduct,
  handleGetProducts,
} from "../controllers/ordersControllers";
const router = express.Router();

// router.get("/", handleGetOrders);
router.get("/:id", handleGetProduct);

export default router;
