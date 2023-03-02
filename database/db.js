import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL;

const Connection = () => {
  mongoose.set("strictQuery", true);
  mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on("connected", () => {
    console.log("Database connected succcessfully");
  });
  mongoose.connection.on("disconnected", () => {
    console.log("Database disconnected succcessfully");
  });

  mongoose.connection.on("error", () => {
    console.log("Error in db", error.message);
  });
};

export default Connection;
