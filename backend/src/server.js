import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { foodsRoutes } from "./routes/foodsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import { ordersRoutes } from "./routes/ordersRouter.js";
import { dbConnect } from "./config/dbConfig.js";
import { fileURLToPath } from "url";
import path, { dirname } from "path";
import { uploadRoutes } from "./routes/uploadRoutes.js";

// db
dbConnect();

//
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
//

const app = express();
const PORT = 3000;
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use("/api/foods", foodsRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/upload", uploadRoutes);

//
const publicFolder = path.join(__dirname, "public");
app.use(express.static(publicFolder));

app.get("*", (req, res) => {
  const indexFilePath = path.join(publicFolder, "index.html");
  res.sendFile(indexFilePath);
});
//

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
