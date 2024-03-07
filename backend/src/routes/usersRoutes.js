import express from "express";
import {
  allUser,
  getUserById,
  loginUser,
  signup,
  toggleBlock,
  updatePassword,
  updateUser,
  updateUserById,
} from "../controllers/usersController.js";
import auth from "../middleware/auth.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", authAdmin, allUser);

router.get("/:userId", authAdmin, getUserById);

router.post("/login", loginUser);

router.post("/signup", signup);

router.put("/updateUser", auth, updateUser);

router.put("/updateUserById", authAdmin, updateUserById);

router.put("/updatePassword", auth, updatePassword);

router.put("/toggleBlock/:userId", authAdmin, toggleBlock);

export { router as usersRoutes };
