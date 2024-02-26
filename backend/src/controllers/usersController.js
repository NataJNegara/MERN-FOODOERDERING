import jwt from "jsonwebtoken";
import "dotenv/config.js";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";

// ==============================================CREATE JWT
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, { expiresIn: "14d" });
};

// ==============================================LOGIN
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //   check if field is empty
  if (!email || !password) {
    return res.status(400).json({ error: "all field are required" });
  }
  //   check if user is exist
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ error: "email is incorrect" });
  }
  //   check if password is correct
  const match = bcrypt.compareSync(password, user.password);
  if (!match) {
    return res.status(400).json({ error: "password is incorrect" });
  }

  try {
    // create jwt
    const token = createToken(user.id);
    res.status(200).json({ email, username: user.username, token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================================SIGN UP
export const signup = async (req, res) => {
  const { email, username, password, address } = req.body;

  // check if data is empty
  if (!email || !username || !password || !address) {
    return res.status(400).json({ error: "all field are required" });
  }

  // check if email is already exist
  const isExist = await User.findOne({ email });
  if (isExist) {
    return res.status(400).json({ error: "email is already registered!" });
  }

  // hash password
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  try {
    const user = await User.create({
      email,
      username,
      password: hash,
      address,
    });
    return res
      .status(200)
      .json({ message: "new user has been added successful", email });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
