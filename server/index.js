import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import dataRoutes from "./routes/index.js";

const app = express();
dotenv.config();
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.use("/data", dataRoutes);

const PORT = process.env.PORT || 5000;
const DB_URL = process.env.CONNECTION_URL;

mongoose
  .connect(DB_URL, {})
  .then(
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
  )
  .catch((err) => {
    console.log("🚀 ~ file: index.js:26 ~ err:", err)
    return err.message
  })