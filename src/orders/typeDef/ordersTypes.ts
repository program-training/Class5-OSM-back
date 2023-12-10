const orderTypes = `
scalar Date

enum OrderStatus {
  pending
  sent
  cancelled
  received
}
type ItemInOrder {
    productId: Int
    name: String
    description: String
    price: Float
    quantity: Int
  }
  
  type ShippingDetails {
    address: String
    userId: ID
    contactNumber: String
    orderType: String
  }
  
  type Order {
    _id:ID!
    cartItems: [ItemInOrder]
    orderTime: Date
    status: OrderStatus!
    price: Float
    shippingDetails: ShippingDetails
  } 

  input UpdateOrderDetailsInput {
    orderId:String!
    address: String
    contactNumber: String
    orderType: String
  }

  input UpdateOrderStatusInput {
    orderId: String!
    status: OrderStatus!
  }


`;

export const ordersTypesQueries = `
getAllOrdersFromMongoDB:[Order]
getOrderById(id:ID!):Order
getOrdersByClientId(userId:ID):[Order]
`;

export const ordersTypesMutation = `
updateOrderDetails(order:UpdateOrderDetailsInput!):Order
updateOrderStatus(order:UpdateOrderStatusInput!):Order!
`;
export default orderTypes;
