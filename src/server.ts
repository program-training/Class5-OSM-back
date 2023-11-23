import "dotenv/config";
import express from "express";
import router from "./router/router";
const app = express();
import chalk from "chalk";
import morgan from "./logger/morgan";
// import { generateInitialUsers } from "./initialData/initialDataService";
import cors from "./cors/cors";
// import cors from "cors";
// const corsOptions = {
//   origin: "*",
//   credentials: true, //access-control-allow-credentials:true
//   optionSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
import {
  connectToMongoose,
  getAllOrdersFromJSON,
  getUserById,
  insertOrdersIntoMongoose,
} from "./dataAccess/mongoose";
import {
  connectionToPostgres,
  getAllUsersFromJSON,
  insertUsersIntoPG,
} from "./dataAccess/postgreSQL";

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
  // const orderData = getAllOrdersFromJSON().then((d) => console.log(d));

  connectionToPostgres()
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));
  getAllUsersFromJSON().then((d) => console.log(d));
  insertUsersIntoPG().then((d) => console.log(d));
  insertOrdersIntoMongoose().then((d) => console.log(d));
});

// insertOrdersIntoMongoose(orderData).then((d) => console.log(d));

// await getUserById("64fefdf422dbe033fdbec2dc");
// const users1 = await getAllUsersFromMongoDB();
// console.log(users1);

// generateInitialUsers()
//   .then(() => console.log(chalk.magentaBright("Initial Users Created!")))
//   .catch((error) => console.log(error));
