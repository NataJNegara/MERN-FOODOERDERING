import express from "express";
import { loginUser, signup } from "../controllers/usersController.js";

const router = express.Router();

router.post("/login", loginUser);

router.post("/signup", signup);

export { router as usersRoutes };
