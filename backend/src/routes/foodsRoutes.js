import express from "express";
import {
  addFood,
  deleteFood,
  getFoodById,
  getFoods,
  getSearch,
  getTag,
  getTags,
  updateFood,
} from "../controllers/foodsController.js";
import authAdmin from "../middleware/authAdmin.js";

const router = express.Router();

router.get("/", getFoods);

router.get("/tags", getTags);

router.delete("/:foodId", authAdmin, deleteFood);

router.post("/", authAdmin, addFood);

router.put("/", authAdmin, updateFood);

// not use yet
router.get("/search/:searchTerm", getSearch);

// not use yet
router.get("/tag/:tag", getTag);

// reminder - this ":foodId" should put at the bottom because it can interupted other url on its bottom
router.get("/:foodId", getFoodById);

export { router as foodsRoutes };
