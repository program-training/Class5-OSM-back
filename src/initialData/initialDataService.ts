import jsonfile from "jsonfile";
const filePathUsers = "/users.json";
const filePathOrders = "/orders.json";

export const readJsonFileUsers = async () => {
  try {
    const data = await jsonfile.readFile(__dirname + filePathUsers);
    return Promise.resolve(data);
  } catch (error) {
    Promise.reject(error);
  }
};
export const readJsonFileOrders = async () => {
  try {
    const data = await jsonfile.readFile(__dirname + filePathOrders);
    return Promise.resolve(data);
  } catch (error) {
    Promise.reject(error);
  }
};
