import express from "express";
import cors from "cors";
import "dotenv/config.js";
import { foodsRoutes } from "./routes/foodsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";
import { ordersRoutes } from "./routes/ordersRouter.js";
import { dbConnect } from "./config/dbConfig.js";

// db
dbConnect();

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

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
