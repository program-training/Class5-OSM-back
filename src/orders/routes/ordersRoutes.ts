import express from "express";
import {
  handleEditOrder,
  handleGetOrder,
  handleGetOrderByUserId,
  handleGetOrders,
  handleOrderFromAPI,
} from "../controllers/ordersControllers";
const router = express.Router();

router.get("/", handleGetOrders);
router.post("/", handleOrderFromAPI);
router.get("/:id", handleGetOrder);
router.put("/:id", handleEditOrder);
router.get("/allOrders/:userId", handleGetOrderByUserId);

export default router;
