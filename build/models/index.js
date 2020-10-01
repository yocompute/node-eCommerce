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
class Model {
    /**
     *
     * @param db --- connected db
     * @param tableName
     * @param definition
     */
    constructor(db, tableName, definition = null) {
        this.db = db;
        this.tableName = tableName;
        this.definition = definition; // optional
    }
    /**
     *
     * @param query
     * @param options
     */
    find(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.find(this.tableName, query, options);
        });
    }
    /**
     *
     * @param query
     * @param options
     */
    findOne(query, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.findOne(this.tableName, query, options);
        });
    }
    /**
     *
     * @param doc
     * @param options
     */
    insertOne(doc, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.insertOne(this.tableName, doc);
        });
    }
    /**
   *
   * @param query
   * @param options
   */
    updateOne(query, update) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.updateOne(this.tableName, query, update);
        });
    }
}
exports.Model = Model;
//# sourceMappingURL=index.js.map