import mongoose from "mongoose";
import Food from "../models/FoodModel.js";

// =====================================GET FOODS
export const getFoods = async (req, res) => {
  try {
    const foods = await Food.find().sort({ createdAt: "desc" });
    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// =====================================GET TAGS
export const getTags = async (req, res) => {
  const tags = await Food.aggregate([
    { $unwind: "$tags" },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        count: "$count",
      },
    },
  ]).sort({ count: -1 });

  const all = {
    name: "all",
    count: await Food.countDocuments(),
  };

  tags.unshift(all);

  res.send(tags);
};

// =====================================SEARCH QUERY
export const getSearch = async (req, res) => {
  const { searchTerm } = req.params;
  const searchRegex = new RegExp(searchTerm, "i");

  // check if food is exist
  const foods = await Food.find({ name: { $regex: searchRegex } });
  if (foods.length === 0) {
    return res.status(400).json({ error: "Food is not found" });
  }

  try {
    return res.status(200).json({ foods });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// =====================================GET TAG
export const getTag = async (req, res) => {
  const { tag } = req.params;

  // check if tag is exist
  const foods = await Food.find({ tags: tag });
  if (foods.length === 0) {
    return res.status(400).json({ error: "Tag is not found" });
  }

  try {
    res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================================GET FOOD BY ID

export const getFoodById = async (req, res) => {
  const { foodId } = req.params;

  // check if id is valid
  if (!mongoose.Types.ObjectId.isValid(foodId)) {
    return res.status(400).json({ error: "ID is invaild" });
  }

  // check if food is exist
  const targetFood = await Food.findById(foodId);

  try {
    const food = await Food.findOne(targetFood._id);
    res.status(200).json({ food });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

// =====================================DELETE FOOD BY ID
export const deleteFood = async (req, res) => {
  const { foodId } = req.params;

  // check if id is empty
  if (!foodId) {
    return res.status(400).json({ error: "Food is is required!" });
  }

  // check if food id is valid
  if (!mongoose.Types.ObjectId.isValid(foodId)) {
    return res.status(400).json({ error: "ID is invalid" });
  }

  // check if foodId is exist
  const targetFood = await Food.findById(foodId);
  if (!targetFood) {
    return res.status(400).json({ error: "Food item is not found" });
  }

  try {
    const food = await Food.deleteOne(targetFood);
    res.status(200).json({ success: "Food deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================================UPDATE FOOD BY ID
export const updateFood = async (req, res) => {
  const { id, name, price, favorite, imageUrl, origins, tags, preparingTime } =
    req.body;

  // check if field is empty
  // check if curr user is authorized

  try {
    const food = await Food.updateOne(
      { _id: id },
      {
        name,
        price,
        favorite,
        tags: tags.split ? tags.split(",") : tags,
        imageUrl,
        origins: origins.split ? origins.split(",") : origins,
        preparingTime,
      }
    );
    res.status(200).json({ success: "Food updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =====================================ADD FOOD

export const addFood = async (req, res) => {
  const { name, price, favorite, imageUrl, origins, tags, preparingTime } =
    req.body;

  // check if field is empty
  // check if curr user is authorized

  try {
    const food = await Food.create({
      name,
      price,
      tags: tags.split ? tags.split(",") : tags,
      imageUrl,
      origins: origins.split ? origins.split(",") : origins,
      preparingTime,
    });
    res.status(200).json({ success: "Food updated successfully", food });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
