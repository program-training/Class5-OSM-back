import express from "express";
import { handleGetOrders } from "../controllers/ordersControllers";
const router = express.Router();

router.get("/", handleGetOrders);

export default router;
