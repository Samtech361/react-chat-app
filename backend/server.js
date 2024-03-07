// changed type: common js => type: module
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5000;

// middleware
app.use("/api/auth", authRoutes);


app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
