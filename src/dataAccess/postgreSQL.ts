import { Pool } from "pg";
export const client = new Pool({
  connectionString:
    "postgres://ivbpgsqh:LtO3C670pkVMwH4GAYgn6ad_q-uBNZOq@cornelius.db.elephantsql.com/ivbpgsqh",
});
export const connectionToPostgres = async () => {
  try {
    await client.connect();
    return "connected to sql";
  } catch (error) {
    return Promise.reject(error);
  }
};
