import express from "express";
import {
  handleGetOrder,
  handleGetOrders,
  handleOrderFromAPI,
} from "../controllers/ordersControllers";
const router = express.Router();

router.get("/", handleGetOrders);
router.post("/", handleOrderFromAPI);
router.get("/:id", handleGetOrder);

export default router;
