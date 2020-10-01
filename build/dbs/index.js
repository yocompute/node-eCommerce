"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongo_1 = require("./mongo");
class DataBase {
    constructor() {
        this.mongo = new mongo_1.MongoDB();
    }
    construct() {
    }
    /**
     *
     * @param username
     * @param password
     * @param port
     * @param dbName
     */
    connect(username, password, port, dbName) {
        return __awaiter(this, void 0, void 0, function* () {
            const r = yield this.mongo.connect(username, password, port, dbName);
            this.dbInstance = r.db;
        });
    }
    find(collectionName, query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.mongo.convertIdFields(query);
            return yield this.mongo.find(this.dbInstance, collectionName, q);
        });
    }
    findOne(collectionName, query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.mongo.convertIdFields(query);
            return yield this.mongo.findOne(this.dbInstance, collectionName, q);
        });
    }
    insertOne(collectionName, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = this.mongo.convertIdFields(doc);
            return yield this.mongo.insertOne(this.dbInstance, collectionName, d);
        });
    }
    updateOne(collectionName, query, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const q = this.mongo.convertIdFields(query);
            const d = this.mongo.convertIdFields(doc);
            return yield this.mongo.updateOne(this.dbInstance, collectionName, q, d);
        });
    }
}
exports.DataBase = DataBase;
//# sourceMappingURL=index.js.map