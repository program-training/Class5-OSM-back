import express, { Request, Response } from "express";
const router = express.Router();
import usersRoutes from "../users/routes/usersRoutes";
import ordersRoutes from "../orders/routes/ordersRoutes";

router.use("/users", usersRoutes);
router.use("/orders", ordersRoutes);
router.get("/connected", (req: Request, res: Response) =>
  res.status(200).send("connected to OMS")
);

router.use("*", (req: Request, res: Response) =>
  res.status(404).send("Page not found!")
);

export default router;
