import express from "express";
import {
  handleGetCategories,
  handleGetCategory,
  handleUpdateCategoryClicks,
} from "../controllers/categoriesControllers";
const router = express.Router();

router.get("/", handleGetCategories);
router.get("/:id", handleGetCategory);
router.put("/:category_name", handleUpdateCategoryClicks);

export default router;
