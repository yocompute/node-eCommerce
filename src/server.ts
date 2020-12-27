import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
// import mongoose from "mongoose";
import dotenv from "dotenv";
// import SSE from 'express-sse-ts';


import { cfg } from "./config";
// import {DataBase} from '../dbs';
// import { EventRoute } from './routes/event';

// import "reflect-metadata";

import { AuthRoute } from "./auth/auth.route";
import { UserRoute } from "./user/user.route";
import { BrandRoute } from "./brand/brand.route";
import { CategoryRoute } from "./category/category.route";
import { QrcodeRoute } from "./qrcode/qrcode.route";
import { ProductRoute } from "./product/product.route";
import { PaymentRoute } from './payment/payment.route';
import { UploaderRoute } from "./uploader/uploader.route";
import { SpecRoute } from "./spec/spec.route";

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
app.use(SVC_PATH + "/categories", CategoryRoute());
app.use(SVC_PATH + "/qrcodes", QrcodeRoute());
app.use(SVC_PATH + "/products", ProductRoute());
app.use(SVC_PATH + "/payments", PaymentRoute());
app.use(SVC_PATH + "/uploads", UploaderRoute());
app.use(SVC_PATH + "/specs", SpecRoute());

app.listen(cfg.SVC_PORT, () => {
  console.log(`svc path: ${SVC_PATH}`);
  console.log(`API listening at http://127.0.0.1:${cfg.SVC_PORT}`);
});