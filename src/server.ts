import "dotenv/config";
import express from "express";
import chalk from "chalk";
import { connectToMongoose } from "./dataAccess/mongoose";
import { connectionToPostgres } from "./dataAccess/postgreSQL";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { redisConnect } from "./cache/redisConnect";
import server from "./graphql/apolloServer";

const app = express();
const startApolloServer = async () => {
  await server.start();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    "/graphql",
    cors({
      origin: [process.env.WHITE_LIST || "http://localhost:5173"],
      credentials: false,
    }),
    expressMiddleware(server)
  );

  app.listen(5000, () => {
    console.log(`🚀 Server ready at http://localhost:5000/graphql`);
  });
};
startApolloServer()
  .then(() => {
    connectToMongoose()
      .then((message) => {
        console.log(chalk.magentaBright(message));
      })
      .catch((error) =>
        console.log(
          chalk.redBright("Connect to mongoDB Error: ", error.message)
        )
      );
  })
  .then(() => {
    connectionToPostgres()
      .then((message) => console.log(chalk.magentaBright(message)))
      .catch((error) => console.log(error.message));
  })
  .then(() => {
    redisConnect()
      .then((message) => {
        console.log(chalk.magentaBright(message));
      })
      .catch((error) =>
        console.log(
          chalk.redBright("Connect to mongoDB Error: ", error.message)
        )
      );
  });
