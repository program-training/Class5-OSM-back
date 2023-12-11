import { ApolloServer } from "@apollo/server";
import { typeDefs } from "./typeDef";
import resolvers from "./resolvers";
import apolloLogger from "./logger/apolloLogger";

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [apolloLogger],
});

export default server;
