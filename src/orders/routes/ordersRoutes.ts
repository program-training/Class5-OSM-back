import express from "express";
import {
  handleEditOrder,
  handleGetOrder,
  handleGetOrders,
  handleOrderFromAPI,
} from "../controllers/ordersControllers";
const router = express.Router();

router.get("/", handleGetOrders);
router.post("/", handleOrderFromAPI);
router.get("/:id", handleGetOrder);
router.put("/:id", handleEditOrder);

export default router;
