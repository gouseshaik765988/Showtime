import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error("❌ MONGODB_URI is missing in .env.local");
}

// Global cache to prevent re-connecting
let cached = global.mongoose;

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectMongo() {
    if (cached.conn) {
        console.log("⚡ Using existing MongoDB connection");
        return cached.conn;
    }

    if (!cached.promise) {
        console.log("📡 Connecting to MongoDB...");
        cached.promise = mongoose
            .connect(MONGODB_URI, {
                bufferCommands: false,
            })
            .then((mongoose) => {
                console.log("✅ MongoDB connected");
                return mongoose;
            })
            .catch((err) => {
                console.error("❌ MongoDB connection failed:", err);
                throw err;
            });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
