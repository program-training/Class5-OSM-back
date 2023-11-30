import express from "express";
import {
  handleGetUser,
  handleGetUsers,
  handleUserRegistration,
  handleEditUser,
  handleDeleteUser,
  handleLogin,
} from "../controllers/usersControllers";
const router = express.Router();
router.get("/:id", handleGetUser);
router.get("/", handleGetUsers);
router.put("/:id", handleEditUser);
router.delete("/:id", handleDeleteUser);
router.post("/login", handleLogin);
router.post("/signup", handleUserRegistration);

export default router;
