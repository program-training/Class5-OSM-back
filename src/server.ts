import "dotenv/config";
import express from "express";
import router from "./router/router";
import chalk from "chalk";
import morgan from "./logger/morgan";
import cors from "./cors/cors";
import {
  connectToMongoose,
  insertOrdersIntoMongoose,
} from "./dataAccess/mongoose";
import {
  connectionToPostgres,
  insertUsersFromJSONIntoPG,
} from "./dataAccess/postgreSQL";

const app = express();

app.use(morgan);
app.use(cors);
app.use(express.json());
app.use(router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));

  connectToMongoose()
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));
  insertOrdersIntoMongoose();

  connectionToPostgres()
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));
  insertUsersFromJSONIntoPG();
});
