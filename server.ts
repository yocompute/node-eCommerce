import express from 'express';
import cors from "cors";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import dotenv from "dotenv";
import SSE from 'express-sse-ts';

import {ProductRoute} from './routes/product';
import {PaymentRoute} from './routes/payment';

import {cfg} from './config';
import {DataBase} from './dbs';
import { EventRoute } from './routes/event';


dotenv.config();

const app = express();
const sse = new SSE();

const SVC_PATH = cfg.SVC_PATH;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false, limit: "1mb" }));
app.use(bodyParser.json({ limit: "1mb" }));

// the url for the EventSource
// app.get('/events', sse.init);


const db = new DataBase();
const DB_USERNAME: any = process.env.DB_USERNAME;
const DB_PASSWORD: any = process.env.DB_PASSWORD;
const DB_NAME: any = process.env.DB_NAME;

db.connect(
    DB_USERNAME,
    DB_PASSWORD,
    cfg.DB_PORT,
    DB_NAME,
).then(() => {
    app.use(SVC_PATH + "/products", ProductRoute(db));
    app.use(SVC_PATH + "/payments", PaymentRoute(db, sse));
});


app.listen(cfg.SVC_PORT, () => {
    console.log(`svc path: ${SVC_PATH}`);
    console.log(`API listening at http://localhost:${cfg.SVC_PORT}`);
})