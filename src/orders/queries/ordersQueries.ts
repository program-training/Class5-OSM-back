import {
  getAllOrdersFromMongoDB,
  getOrderById,
  getOrdersByClientId,
  updateOrderDetails,
  updateOrderStatus,
} from "../resolvers/ordersResolvers";

const ordersQueries = {
  getAllOrdersFromMongoDB,
  getOrderById,
  getOrdersByClientId,
};

export const ordersMutations = {
  updateOrderStatus,
  updateOrderDetails,
};

export default ordersQueries;
