import { createClient } from "redis";

export const redisConnect = async () => {
  const client = createClient();
  await client
    .connect()
    .then(() => console.log("connected to redis successfully"))
    .catch((err) => console.log(err));
};
