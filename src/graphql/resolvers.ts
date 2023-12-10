import ordersQueries, {
  ordersMutations,
} from "../orders/queries/ordersQueries";
import { userQueries, usersMutation } from "../users/graphql/userQueries";

const resolvers = {
  Query: {
    ...ordersQueries,
    ...userQueries,
  },

  Mutation: {
    ...usersMutation,
    ...ordersMutations,
  },
};

export default resolvers;
