import { Pool } from "pg";
import "dotenv/config";
import { readJsonFileUsers } from "../initialData/initialDataService";
import UserInterface from "../users/interfaces/UserInterface";
export const client = new Pool({
  connectionString: process.env.POSTGRESQL_URI,
});
export const connectionToPostgres = async () => {
  try {
    await client.connect();
    await client.connect();
    return "Connected to PotsgreSQL";
  } catch (error) {
    return Promise.reject(error);
  }
};
export const getAllUsersFromJSON = async () => {
  try {
    const users: UserInterface[] = await readJsonFileUsers();
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
