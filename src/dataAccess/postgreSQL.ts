import { Pool, PoolClient } from "pg";
import "dotenv/config";
import { readJsonFileUsers } from "../initialData/initialDataService";
import UserInterface from "../users/interfaces/UserInterface";
import { insertUsersIntoPGFunc } from "../types/insertUsersIntoPGFunc";
export const client = new Pool({
  connectionString: process.env.POSTGRESQL_CONNECTION_STRING,
});
export const connectionToPostgres = async () => {
  try {
    await client.connect();
    return "Connected to PostgreSQL";
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
export const getAllUsersFromPG = async () => {
  try {
    const query = "SELECT COUNT(*) FROM users";
    const result = await client.query(query);
    console.log(result.rows[0].count);

    if (result.rows[0].count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    if (error instanceof Error)
      throw new Error(`Error in getAllUsersFromPG: ${error.message}`);
  }
};

export const insertUsersIntoPG: insertUsersIntoPGFunc = async (val) => {
  try {
    const tableName = "users";
    const columns = ["email", "password", "isadmin"];
    const values = val;
    const query = `INSERT INTO ${tableName} (${columns.join(
      ", "
    )}) VALUES ($1, $2, $3)`;
    await client.query(query, values);
  } catch (error) {
    console.log("failed to insert to PG");
  }
};

export const insertUsersFromJSONIntoPG = async () => {
  try {
    const check = await getAllUsersFromPG();
    if (check) {
      console.log("Already have users");
    } else {
      const users = await getAllUsersFromJSON();
      users.forEach(async (user) => {
        await insertUsersIntoPG([user.email, user.password, user.isAdmin]);
      });
    }
  } catch (error) {
    return Promise.reject(error);
  }
};
