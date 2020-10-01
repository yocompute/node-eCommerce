"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const log_1 = require("../models/log");
class LogController extends index_1.Controller {
    constructor(db) {
        super(db, 'logs');
        this.model = new log_1.Log(db, { msg: 'String', created: 'String' });
    }
}
exports.LogController = LogController;
//# sourceMappingURL=log.js.map