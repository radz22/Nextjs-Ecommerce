import mongoose from "mongoose";

const db: string | any = process.env.MONGODB_URL;
const dbConnection = async () => {
  try {
    await mongoose.connect(db);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
};

export default dbConnection;
