import mongoose from "mongoose";
import seedUsers from "./seedUsers";

const cached = global.mongoose || {
  connection: null,
  promise: null,
  seedPromise: null,
};

if (!global.mongoose) global.mongoose = cached;

export default async function dbConnect() {
  if (!process.env.DEX_PHOTOS) {
    throw new Error("DEX_PHOTOS environment variable is required");
  }

  if (!cached.connection && !cached.promise) {
    cached.promise = mongoose
      .connect(process.env.DEX_PHOTOS)
      .then((instance) => instance);
  }

  try {
    if (!cached.connection) cached.connection = await cached.promise;
    if (!cached.seedPromise) {
      cached.seedPromise = seedUsers().catch((error) => {
        cached.seedPromise = null;
        throw error;
      });
    }
    await cached.seedPromise;
    return cached.connection;
  } catch (error) {
    cached.promise = null;
    throw error;
  }
}
