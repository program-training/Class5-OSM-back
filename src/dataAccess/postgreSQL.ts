import { Pool } from "pg";
import { readJsonFileUsers } from "../initialData/initialDataService";
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
export const getAllUsersFromJSON = async () => {
  try {
    const users = await readJsonFileUsers();
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const insertUsersIntoPG = async () => {
  try {
    const tableName = "your_table";

    const columns = ["email", "password", "isAdmin"];
    // const users = await getAllUsersFromJSON()
    const values = ["value1", "value2", "value3"];

    const query = `INSERT INTO ${tableName} (${columns.join(
      ", "
    )}) VALUES ($1, $2) RETURNING *`;

    // Execute the INSERT query
    const result = await client.query(query, values);
  } catch (error) {}
};
