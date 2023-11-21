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
  connectToDatabase,
  getAllUsersFromMongoDB,
  getUserById,
  insertUsers,
} from "./dataAccess/mongoose";
import { connectionToPostgres } from "./dataAccess/postgreSQL";

app.use(morgan);
app.use(cors);
app.use(express.json());
app.use(router);

const PORT = 3333;
app.listen(PORT, () => {
  // await getUserById("64fefdf422dbe033fdbec2dc");
  // const users1 = await getAllUsersFromMongoDB();
  // console.log(users1);
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));

  connectToDatabase()
    .then((message) => console.log(message))
    .catch((error) => console.log(error.message));

  // connectionToPostgres()
  //   .then((message) => console.log(message))
  //   .catch((error) => console.log(error.message));

  // generateInitialUsers()
  //   .then(() => console.log(chalk.magentaBright("Initial Users Created!")))
  //   .catch((error) => console.log(error));
});
