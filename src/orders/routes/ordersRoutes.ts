import express from "express";
import {
  handleGetOrders,
  // handleGetProduct,
  // handleGetProducts,
} from "../controllers/ordersControllers";
const router = express.Router();

router.get("/orders", handleGetOrders);

export default router;

// router.get("/orders", handleGetProduct);
// router.get("/", handleGetOrders);
