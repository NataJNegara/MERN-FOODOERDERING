import express from "express";
import multer from "multer";
import authAdmin from "../middleware/authAdmin.js";
import { configCloudinary } from "../config/cloudinaryConfig.js";

const router = express.Router();
const upload = multer();

router.post("/", authAdmin, upload.single("image"), async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: "Theres no uploaded file" });
  }

  const imageUrl = await uploadImageToCloudinary(req.file?.buffer);
  res.send({ imageUrl });
  //   res.status(200).json({ imageUrl });
});

const uploadImageToCloudinary = (imageBuffer) => {
  const cloudinary = configCloudinary();

  return new Promise((resolve, reject) => {
    if (!imageBuffer) reject(null);

    cloudinary.uploader
      .upload_stream((error, result) => {
        if (error || !result) reject(error);
        else resolve(result.url);
      })
      .end(imageBuffer);
  });
};

export { router as uploadRoutes };
