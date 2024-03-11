// changed type: common js => type: module
import express from "express";
import dotenv from "dotenv";
import connectToMongoDB from "./db/connectToMongoDB.js";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import conversationRoutes from "./routes/conversation.routes.js";

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5000;

// middleware
app.use(express.json()); //to parse json payload from req.body

//routes
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
// app.use("/api/conversation", conversationRoutes); 

app.get("/", (req, res) => {
  res.send("homepage route");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log("listening on port " + PORT);
});
