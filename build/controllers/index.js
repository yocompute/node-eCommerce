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
exports.Code = {
    SUCCESS: 'success',
    FAIL: 'fail'
};
class Controller {
    constructor(db, model) {
        this.db = db;
        this.model = model;
    }
    /**
    *
    * @param req
    * @param res
    */
    find(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = req.query.where;
            const options = req.query.options;
            let data = [];
            let code = exports.Code.FAIL;
            res.setHeader('Content-Type', 'application/json');
            try {
                if (where) {
                    const r = yield this.model.find(where, options);
                    code = exports.Code.SUCCESS;
                    data = r;
                }
                else {
                    const r = yield this.model.find({}, options);
                    code = exports.Code.SUCCESS;
                    data = r;
                }
                res.send({ code, data });
            }
            catch (error) {
                console.log(`list error: ${error.message}`);
                res.send({ code, data });
            }
        });
    }
    /**
     *
     * @param req
     * @param res
     */
    getById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            let data = {};
            let code = exports.Code.FAIL;
            const options = (req.query && req.query.options) || {};
            res.setHeader('Content-Type', 'application/json');
            try {
                data = yield this.model.findOne({ _id: id }, null);
                code = exports.Code.SUCCESS;
                res.send({ code, data });
            }
            catch (error) {
                // logger.error(`get error : ${error}`);
            }
            finally {
                res.send({ code, data });
            }
        });
    }
    insertOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const d = req.body.data;
            let code = exports.Code.FAIL;
            let data = null;
            try {
                if (req.body) {
                    const r = yield this.model.insertOne(d);
                    if (r) {
                        code = exports.Code.SUCCESS;
                        data = r; // r.upsertedId ?
                    }
                    else {
                        code = exports.Code.FAIL;
                    }
                }
            }
            catch (error) {
                // logger.error(`updateOne error: ${error}`);
            }
            finally {
                res.setHeader("Content-Type", "application/json");
                res.send({
                    code,
                    data,
                });
            }
        });
    }
    updateOne(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const _id = req.params.id;
            const updates = req.body.data;
            let code = exports.Code.FAIL;
            let data = _id;
            try {
                if (req.body) {
                    const r = yield this.model.updateOne({ _id }, updates);
                    if (r) {
                        code = exports.Code.SUCCESS;
                        data = _id; // r.upsertedId ?
                    }
                    else {
                        code = exports.Code.FAIL;
                        data = _id;
                    }
                }
            }
            catch (error) {
                // logger.error(`updateOne error: ${error}`);
            }
            finally {
                res.setHeader("Content-Type", "application/json");
                res.send({
                    code,
                    data,
                });
            }
        });
    }
}
exports.Controller = Controller;
//# sourceMappingURL=index.js.map