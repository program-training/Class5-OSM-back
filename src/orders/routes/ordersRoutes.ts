import express from "express";
import {
  handleGetOrders,
  handleOrderFromAPI,
} from "../controllers/ordersControllers";
const router = express.Router();

router.get("/", handleGetOrders);
router.post("/", handleOrderFromAPI);

export default router;
