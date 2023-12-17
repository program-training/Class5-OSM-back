const orderTypes = `
scalar Date

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
    status: String
    price: Float
    shippingDetails: ShippingDetails
  } 

  input UpdateOrderDetailsInput {
    orderId:String
    address: String
    contactNumber: String
    orderType: String
  }

  input UpdateOrderStatusInput {
    orderId: String
    status: String!
  }

  input ItemInOrderInput {
    productId: Int
    name: String
    description: String
    price: Float
    quantity: Int
  }
  
  input ShippingDetailsInput {
    address: String
    userId: ID
    contactNumber: String
    orderType: String
  }

  input NewOrderInput {
    cartItems: [ItemInOrderInput]
    orderTime: Date
    status: String
    price: Float
    shippingDetails: ShippingDetailsInput
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
createNewOrder(newOrder:NewOrderInput!):Order!
`;
export default orderTypes;
