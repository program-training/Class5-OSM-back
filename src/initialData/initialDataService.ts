import jsonfile from "jsonfile";
const filePathUsers = "src/initialData/users.json";
const filePathOrders = "src/initialData/orders.json";

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
