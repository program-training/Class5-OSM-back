import { createClient } from "redis";
export const client = createClient();
export const redisConnect = async () => {
  try {
    await client.connect();
    return "connected successfully to Redis client!!!";
  } catch (error) {
    if (error instanceof Error) {
      return Promise.reject(error.message);
    }
  }
};
