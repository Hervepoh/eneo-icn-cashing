import Redis from "ioredis"
require("dotenv").config();

const redisClient = () => {
    if (process.env.REDIS_URL) {
        console.log(`Redis connected from host ${process.env.REDIS_URL}`)
        return process.env.REDIS_URL;
    }
    throw new Error("Redis connection failed");   
}

console.log("Check redis configuration")
export const redis = new Redis({
    host: process.env.REDIS_HOSTNAME, // Redis host
    port: parseInt(process.env.REDIS_PORT || "6379"), // Redis port
    password: process.env.REDIS_PASSWORD
  });
