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
router.post("/registration", handleUserRegistration); // post add new user
router.put("/:id", handleEditUser); // update user
router.delete("/:id", handleDeleteUser);
router.post("/login", handleLogin);
// router.post("/add-product/:id", handleAddProductToUser);
router.post("/signup", handleUserRegistration);

export default router;
