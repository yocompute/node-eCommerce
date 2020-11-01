import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import dotenv from "dotenv";
// import SSE from 'express-sse-ts';

// import {PaymentRoute} from './routes/payment';

import { cfg } from './config';
// import {DataBase} from '../dbs';
// import { EventRoute } from './routes/event';

import "reflect-metadata";
import { Connection, createConnection } from "typeorm";

import { UserRoute } from './user/user.route';
import { ProductRoute } from './routes/product';

dotenv.config();

const app = express();
// const sse = new SSE();

const SVC_PATH = cfg.SVC_PATH;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));
app.use(bodyParser.json({ limit: "1mb" }));

// the url for the EventSource
// app.get('/events', sse.init);
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;

createConnection({
    type: "mongodb",
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_NAME,
    // authSource: "shippal",
    poolSize: 5,
    entities: [
        __dirname + "/*/*.entity.js"
    ],
}).then((connection: Connection) => {
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

}).catch(error => console.log(error));

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


app.listen(cfg.SVC_PORT, () => {
    console.log(`svc path: ${SVC_PATH}`);
    console.log(`API listening at http://localhost:${cfg.SVC_PORT}`);
})