import orderTypes, {
  ordersTypesMutation,
  ordersTypesQueries,
} from "../orders/typeDef/ordersTypes";
import {
  userTypes,
  userMutation,
  userQueries,
} from "../users/graphql/userTypes";

export const typeDefs = `#graphql

${orderTypes}
${userTypes}

type Query{
${ordersTypesQueries}
${userQueries}
}

type Mutation{
  ${userMutation}
  ${ordersTypesMutation}
}
 `;
