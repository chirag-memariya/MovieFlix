import dotenv from 'dotenv';
dotenv.config();

export const config = {
  OMDB_API_KEY: process.env.OMDB_API_KEY,
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  CACHE_TTL: 86400,   // 24h
  PORT: process.env.PORT || 3000
};