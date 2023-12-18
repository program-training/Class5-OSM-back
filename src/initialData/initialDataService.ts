import path from "path";
import jsonfile from "jsonfile";


const __dirname = './commonjsDirName.ts';
const filePathUsers = path.join(__dirname, "users.json");
const filePathOrders = path.join(__dirname, "orders.json");



export const readJsonFileUsers = async () => {
  try {
    const data = await jsonfile.readFile(filePathUsers);
    return Promise.resolve(data);
  } catch (error) {
    Promise.reject(error);
  }
};
export const readJsonFileOrders = async () => {
  try {
    const data = await jsonfile.readFile(filePathOrders);
    return Promise.resolve(data);
  } catch (error) {
    Promise.reject(error);
  }
};
