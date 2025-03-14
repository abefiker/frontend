import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable.");
}

export const connectDB = async () => {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(MONGODB_URI, {
        serverSelectionTimeoutMS: 60000, // Increase timeout to 30s
    } as any);
    console.log("Connected to MongoDB");
};
