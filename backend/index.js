import express from "express";
import "dotenv/config";
import cors from "cors";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.js";
import todoRoutes from './routes/todoRoutes.js'

const PORT = process.env.PORT || 5000;
const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// database connection
connectDB();

app.use("/api/user", userRoutes);
app.use("/api/user/todo",todoRoutes)

app.listen(PORT, (err) => {
  if (!err) {
    console.log("server running PORT : ", PORT);
  } else {
    console.log(err);
  }
});
