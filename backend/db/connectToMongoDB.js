import mongoose from "mongoose";

const connectToMongoDB = async () => {
  try {
    mongoose.connect("mongodb://localhost:27017/chat-app");
    // await mongoose.connect(process.env.MONGO_DB_URI); online//connectin to mongoDB cloud using a URL
    console.log("Connected to MongoDB...");
  } catch (error) {
    console.log("error connecting to the database...", error.message);
  }
};

export default connectToMongoDB;
