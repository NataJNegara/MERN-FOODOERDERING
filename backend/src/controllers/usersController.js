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
    res
      .status(200)
      .json({ email, username: user.username, address: user.address, token });
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
    res
      .status(200)
      .json({ message: "new user has been added successful", email });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================================UPDATE USER
export const updateUser = async (req, res) => {
  const { username, address } = req.body;
  // check if data is empty
  if (!username || !address) {
    return res
      .status(400)
      .json({ error: "Username or Address should not be empty!" });
  }

  try {
    // grab curr user from auth and update user
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, address },
      { new: true }
    );

    // create new token
    const token = createToken(user.id);

    res.status(200).json({
      success: "User profile updated successfully",
      email: user.email,
      username: user.username,
      address: user.address,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ==============================================UPDATE USER PASSWORD
export const updatePassword = async (req, res) => {
  const { currPassword, newPassword } = req.body;

  // if input empty
  if (!currPassword || !newPassword) {
    return res.status(400).json({ error: "All field is required" });
  }

  // grab curr user and
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(400).json({ error: "User is invalid" });
  }

  // check if curr user password match
  const match = bcrypt.compareSync(currPassword, user.password);
  if (!match) {
    return res.status(400).json({ error: "Password is not correct!" });
  }

  // hash new password
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(newPassword, salt);

  try {
    const updatedPassword = await user.updateOne({ password: hash });
    res.status(200).json({ success: "Password change successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
