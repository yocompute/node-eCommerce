import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import dotenv from "dotenv";
// import SSE from 'express-sse-ts';

// import {PaymentRoute} from './routes/payment';

import { cfg } from "./config";
// import {DataBase} from '../dbs';
// import { EventRoute } from './routes/event';

import "reflect-metadata";
// import { Connection, createConnection } from "typeorm";

import { AuthRoute } from './auth/auth.route';
import { UserRoute } from './user/user.route';
import { BrandRoute } from './brand/brand.route';
import { ProductRoute } from './product/product.route';

dotenv.config();

const app = express();
// const sse = new SSE();

const SVC_PATH = process.env.ENV === "local" ? cfg.SVC_PATH : "";

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));
app.use(bodyParser.json({ limit: "1mb" }));

// the url for the EventSource
// app.get('/events', sse.init);


app.use(SVC_PATH + "/auth", AuthRoute());
app.use(SVC_PATH + "/users", UserRoute());
app.use(SVC_PATH + "/brands", BrandRoute());
app.use(SVC_PATH + "/products", ProductRoute());


app.listen(cfg.SVC_PORT, () => {
  console.log(`svc path: ${SVC_PATH}`);
  console.log(`API listening at http://localhost:${cfg.SVC_PORT}`);
});
