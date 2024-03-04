import express from "express";
import auth from "../middleware/auth.js";
import {
  createOrder,
  getCurrOrder,
  getCurrUserOrders,
  getOrderById,
  payment,
} from "../controllers/ordersController.js";

const router = express.Router();

router.post("/create", auth, createOrder);

router.get("/currUserOrder", auth, getCurrOrder);

router.put("/pay", auth, payment);

router.get("/track/:orderId", auth, getOrderById);

// order with S
router.get("/currUserOrders", auth, getCurrUserOrders);

export { router as ordersRoutes };
