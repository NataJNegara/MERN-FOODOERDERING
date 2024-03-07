import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, requried: true },
    email: { type: String, requried: true, unique: true },
    password: { type: String, requried: true },
    address: { type: String, requried: true },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

const User = mongoose.model("User", UserSchema);
export default User;
