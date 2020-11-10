import { Connection, createConnection } from "typeorm";
import express from "express";
import { AuthRoute } from "./auth/auth.route";
import { UserRoute } from "./user/user.route";
import { ProductRoute } from "./routes/product";
import { cfg } from "./config";

const app = express();
const SVC_PATH = process.env.ENV === "local" ? cfg.SVC_PATH : "";

const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
const DB_AUTH_SOURCE = process.env.DB_AUTH_SOURCE;
const DB_AUTH = process.env.DB_AUTH;

const db_connection = () => {
  if (DB_AUTH) {
    createConnection({
      type: "mongodb",
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      authSource: DB_AUTH_SOURCE,
      useUnifiedTopology: true,
      poolSize: 5,
      entities: [__dirname + "/*/*.entity.js"],
    })
      .then((connection: Connection) => {
        app.use(SVC_PATH + "/auth", AuthRoute(connection));
        app.use(SVC_PATH + "/users", UserRoute(connection));
        app.use(SVC_PATH + "/products", ProductRoute(connection));
        // console.log("Inserting a new user into the database...");
        // const user = new User();
        // // user.firstName = "Timber";
        // // user.lastName = "Saw";
        // // user.age = 25;
        // await connection.manager.save(user);
        // console.log("Saved a new user with id: " + user.id);

        // console.log("Loading users from the database...");
        // const users = await connection.manager.find(User);
        // console.log("Loaded users: ", users);

        // console.log("Here you can setup and run express/koa/any other framework.");
      })
      .catch((error) => console.log(error));
  } else {
    //Todo: No Auth needed mongoDB connection
    createConnection({
      type: "mongodb",
      username: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_NAME,
      authSource: DB_AUTH_SOURCE,
      useUnifiedTopology: true,
      poolSize: 5,
      entities: [__dirname + "/*/*.entity.js"],
    })
      .then((connection: Connection) => {
        app.use(SVC_PATH + "/auth", AuthRoute(connection));
        app.use(SVC_PATH + "/users", UserRoute(connection));
        app.use(SVC_PATH + "/products", ProductRoute(connection));
      })
      .catch((error) => console.log(error));
  }

  // const db = new DataBase();
  // const DB_USERNAME: any = process.env.DB_USERNAME;
  // const DB_PASSWORD: any = process.env.DB_PASSWORD;
  // const DB_NAME: any = process.env.DB_NAME;

  // db.connect(
  //     DB_USERNAME,
  //     DB_PASSWORD,
  //     cfg.DB_PORT,
  //     DB_NAME,
  // ).then(() => {
  //     app.use(SVC_PATH + "/products", ProductRoute(db));
  //     app.use(SVC_PATH + "/payments", PaymentRoute(db, sse));
  // });
};

export default db_connection;