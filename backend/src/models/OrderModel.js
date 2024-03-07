import mongoose from "mongoose";
import Food from "./FoodModel.js";

const LatLngSchema = new mongoose.Schema(
  {
    lat: { type: String, required: true },
    lng: { type: String, required: true },
  },
  {
    _id: false,
  }
);

// const OrderItemSchema = new mongoose.Schema(
//   {
//     food: { type: Food.schema, required: true },
//     // price: { type: Number, required: true },
//     // quantity: { type: Number, required: true },
//   },
//   {
//     _id: false,
//   }
// );

// OrderItemSchema.pre("validate", function (next) {
//   this.price = this.food.price * this.food.quantity;
//   next();
// });

const OrderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    addressLatLng: { type: LatLngSchema, required: true },
    paymentId: { type: String },
    totalPrice: { type: Number, required: true },
    // items: { type: [OrderItemSchema], required: true },
    items: { type: Array, required: true },
    status: { type: String, default: "new" },
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    email: { type: String, required: true },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
