// db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const DBConnection = async () => {
    const MONGODB_URL = process.env.MONGODB_URI;
    try {
        await mongoose.connect(MONGODB_URL);
        console.log("DB Connection established!");
    } catch (error) {
        console.error("Error!! while connecting to MongoDB:", error);
    }
};
