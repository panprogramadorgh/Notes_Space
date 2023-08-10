import mongoose from "mongoose";

const getConnectionString = () => {
  const CONNECTION_STR = process.env.CONNECTION_STR;
  if (!CONNECTION_STR)
    throw new Error("CONNECTION_STR envoriment variable is required !");
  return CONNECTION_STR;
};

export default async function connectDB(): Promise<boolean | undefined> {
  if (mongoose.connection?.readyState === 1) return;
  try {
    await mongoose.connect(getConnectionString());
    return true;
  } catch (error) {
    throw false;
  }
}
