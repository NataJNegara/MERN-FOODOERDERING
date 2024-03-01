import express from "express";
import {
  loginUser,
  signup,
  updatePassword,
  updateUser,
} from "../controllers/usersController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signup);

router.put("/updateUser", auth, updateUser);

router.put("/updatePassword", auth, updatePassword);

export { router as usersRoutes };
