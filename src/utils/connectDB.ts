import mongoose from "mongoose";

const CONNECTION_STR = process.env.CONNECTION_STR;
if (!CONNECTION_STR)
  throw new Error("CONNECTION_STR envoriment variable is required !");

export default async function connectDB() {
  if (mongoose.connection.readyState === 1) return;
  try {
    await mongoose.connect(CONNECTION_STR as string);
    console.log(">>> Connected to database");
    return true;
  } catch (error) {
    console.log(`>>> Error connecting to database | Error: ${error}`);
    return false;
  }
}
