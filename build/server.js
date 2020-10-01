"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
// import mongoose from "mongoose";
const dotenv_1 = __importDefault(require("dotenv"));
const product_1 = require("./routes/product");
const config_1 = require("./config");
const dbs_1 = require("./dbs");
dotenv_1.default.config();
const app = express_1.default();
const SVC_PATH = config_1.cfg.SVC_PATH;
app.use(cors_1.default());
app.use(body_parser_1.default.urlencoded({ extended: false, limit: "1mb" }));
app.use(body_parser_1.default.json({ limit: "1mb" }));
const db = new dbs_1.DataBase();
const DB_USERNAME = process.env.DB_USERNAME;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_NAME = process.env.DB_NAME;
db.connect(DB_USERNAME, DB_PASSWORD, config_1.cfg.DB_PORT, DB_NAME).then(() => {
    app.use(SVC_PATH + "/products", product_1.ProductRoute(db));
});
app.listen(config_1.cfg.SVC_PORT, () => {
    console.log(`svc path: ${SVC_PATH}`);
    console.log(`API listening at http://localhost:${config_1.cfg.SVC_PORT}`);
});
//# sourceMappingURL=server.js.map