import UserInterface from "../users/interfaces/UserInterface";
import { getUsers, register } from "../users/services/usersApiService";
import chalk from "chalk";
import jsonfile from "jsonfile";
const filePath = "src/initialData/users.json";

// Use async/await to read the JSON file
export const readJsonFile = async () => {
  try {
    const data = await jsonfile.readFile(filePath);
    return Promise.resolve(data);
  } catch (error) {
    Promise.reject(error);
  }
};

// export const generateInitialUsers = async () => {
//   try {
//     const usersInDB = await getUsers();
//     if (Array.isArray(usersInDB) && usersInDB.length) return null;

//     const users: UserInterface[] = [];
//     for (const user of data.users) {
//       try {
//         const userInDB = await register(user);
//         users.push(userInDB as UserInterface);
//       } catch (error) {
//         console.log(chalk.redBright("Could not register this user"));
//       }
//     }

//     Promise.resolve(users);
//   } catch (error) {
//     console.log(chalk.redBright(error));
//     Promise.reject(error);
//   }
// };
