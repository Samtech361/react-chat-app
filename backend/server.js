// changed type: common js => type: module
import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); //to parse json payload from req.body
app.use("/api/auth", authRoutes); //authentication routes
// user routes
//message routes

app.get("/", (req, res) => {
  res.send("homepage route");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("listening on port " + PORT);
});
