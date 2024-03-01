import mongoose from "mongoose";

export const FoodSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    preparingTime: { type: String, required: true },
    favorite: { type: Boolean, defualt: false },
    origins: { type: [String], required: true },
    stars: { type: Number, default: 5 },
    imageUrl: { type: String, required: true },
    tags: { type: [String] },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const Food = mongoose.model("Food", FoodSchema);
export default Food;
