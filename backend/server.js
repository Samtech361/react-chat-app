// changed type: common js => type: module
import express from "express";
import dotenv from "dotenv";

const app = express();
dotenv.config();

let PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  //root route https://localhost:5000/
  res.send("welcome to homepage");
});

app.listen(PORT, () => {
  console.log("listening on port " + PORT);
});
