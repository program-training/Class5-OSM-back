import { RedisJSON } from "@redis/json/dist/commands";
import { client } from "../../cache/redisConnect";

export const setWithKey = async (key: string, args: string) => {
  try {
    return await client.set(key, args);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getWithKey = async (key: string) => {
  try {
    return await client.get(key);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const checkExistKey = async (key: string) => {
  return await client.exists(key);
};

export const setWithJsonKey = async (
  key: string,
  path: string,
  args: RedisJSON
) => {
  return await client.json.set(key, path, args);
};
