import ordersQueries, {
  ordersMutations,
} from "../orders/queries/ordersQueries";
import { userQueries, usersMutation } from "../users/graphql/userQueries";

export const resolvers = {
  Query: {
    ...ordersQueries,
    ...userQueries,
  },

  Mutation: {
    ...usersMutation,
    ...ordersMutations,
  },
};
