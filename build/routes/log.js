"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const log_1 = require("../controllers/log");
function LogRoute(db) {
    const router = express_1.default.Router();
    const controller = new log_1.LogController(db);
    router.post('/', (req, res) => { controller.insertOne(req, res); });
    router.get('/', (req, res) => { controller.find(req, res); });
    router.put('/:id', (req, res) => { controller.updateOne(req, res); });
    return router;
}
exports.LogRoute = LogRoute;
//# sourceMappingURL=log.js.map