import express, { Request, Response } from "express";
const router = express.Router();
import usersRoutes from "../users/routes/usersRoutes";
import productsRoutes from "../products/routes/productsRoutes";
import categoriesRoutes from "../categories/routes/categoriesRoutes";
import ordersRoutes from "../orders/routes/ordersRoutes";

router.use("/api/users", usersRoutes);
router.use("/api/orders", ordersRoutes);
router.use("/api/products", productsRoutes);
router.use("/api/categories", categoriesRoutes);

router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;
