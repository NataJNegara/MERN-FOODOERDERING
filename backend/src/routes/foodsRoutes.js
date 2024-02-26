import express from "express";
import {
  getFoodById,
  getFoods,
  getSearch,
  getTag,
  getTags,
} from "../controllers/foodsController.js";

const router = express.Router();

router.get("/", getFoods);

router.get("/tags", getTags);

// not use yet
router.get("/search/:searchTerm", getSearch);

// not use yet
router.get("/tag/:tag", getTag);

// reminder - this ":foodId" should put at the bottom because it can interupted other url on its bottom
router.get("/:foodId", getFoodById);

export { router as foodsRoutes };
