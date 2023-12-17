import { BaseContext, GraphQLRequestContext } from "@apollo/server";
import chalk from "chalk";


const apolloLogger = {
  async requestDidStart({ request }: GraphQLRequestContext<BaseContext>) {
    request.http &&
      request.http &&
      request.operationName !== "IntrospectionQuery" &&
      console.log(
        chalk.cyanBright(
          `[${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}] ${
            request.http.method
          } ${request.query}`
        )
      );
  },
};

export default apolloLogger;
