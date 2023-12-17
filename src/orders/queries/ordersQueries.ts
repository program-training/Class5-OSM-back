import {
  getAllOrdersFromMongoDB,
  getOrderById,
  getOrdersByClientId,
  updateOrderDetails,
  updateOrderStatus,
  createNewOrder,
} from "../resolvers/ordersResolvers";

const ordersQueries = {
  getAllOrdersFromMongoDB,
  getOrderById,
  getOrdersByClientId,
};

export const ordersMutations = {
  updateOrderStatus,
  updateOrderDetails,
  createNewOrder,
};

export default ordersQueries;
