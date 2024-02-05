import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

let cashed = (global as any).mongoose || { connection: null, promise: null };

export const connectToDb = async () => {
  if (cashed.connection) return cashed.connection;

  if (!MONGODB_URI) throw new Error("Failed to connect to date base");

  cashed.promise =
    cashed.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "Evently",
      bufferCommands: false,
    });

  cashed.connection = await cashed.promise;

  return cashed.connection;
};
