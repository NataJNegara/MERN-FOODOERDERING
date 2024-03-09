import { connect, set } from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/UserModel.js";
import Food from "../models/FoodModel.js";
import { SampleUsers, sampleData } from "../data.js";

set("strictQuery", true);

export const dbConnect = async () => {
  try {
    connect(process.env.MONGO_URI, { dbName: "mern-food" });
    // seeding
    await seedUsers();
    await seedFoods();
    console.log("db connect successful");
  } catch (error) {
    console.log(error);
  }
};

// ========================================SEEDING
async function seedUsers() {
  const userCount = await User.countDocuments();
  if (userCount > 0) {
    return console.log("User seed is already done.");
  }

  for (let user of SampleUsers) {
    // encrypt password
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(user.password, salt);

    await User.create({ ...user, password: hash });
  }

  console.log("User seeding is done!");
}

async function seedFoods() {
  const foodsCount = await Food.countDocuments();
  if (foodsCount > 0) {
    return console.log("Food seed is already done.");
  }

  for (let food of sampleData) {
    // for convinient if we dont have "foods" folder of image in our local(front-end)
    const imageUrl = `/foods/${food.imageUrl}`;
    await Food.create({ ...food, imageUrl: imageUrl });
  }

  console.log("Food seeding is done!");
}
