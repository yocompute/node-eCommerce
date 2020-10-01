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
const mongodb_1 = require("mongodb");
const config_1 = require("../config");
class MongoDB {
    constructor() {
    }
    /**
     *
     * @param {*} username
     * @param {*} password
     * @param {*} port
     * @param {*} dbName
     *
     * return Promise
     */
    connect(username, password, port, dbName) {
        const connectionStr = username && password ?
            `mongodb://${username}:${password}@localhost:${port}/${dbName}?authSource=admin` : `mongodb://localhost:${port}/${dbName}?authSource=admin`;
        const options = {
            poolSize: config_1.cfg.DB_POOL_SIZE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(connectionStr, options).then((connectClient) => {
                const db = this.getDb(connectClient, dbName);
                // console.log('mongodb connected ...');
                resolve({ db, connection: connectClient, err: null });
            }, (err) => {
                // console.log('mongodb connection exception ...');
                reject({ db: null, connection: null, err });
            });
        });
    }
    /**
     *
     * @param connection
     * @param dbName
     */
    getDb(connection, dbName) {
        return connection.db(dbName);
    }
    /**
     *
     * @param db
     * @param collectionName
     */
    getCollection(db, collectionName) {
        return new Promise(res => {
            if (db) {
                const collection = db.collection(collectionName);
                if (collection) {
                    res(collection);
                }
                else {
                    db.createCollection(collectionName, (cc) => {
                        res(cc);
                    });
                }
            }
            else {
                res();
            }
        });
    }
    find(db, collectionName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.getCollection(db, collectionName);
            if (c) {
                return yield c.find(query).toArray();
            }
            else {
                return null;
            }
        });
    }
    findOne(db, collectionName, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.getCollection(db, collectionName);
            if (c) {
                return yield c.findOne(query);
            }
            else {
                return null;
            }
        });
    }
    insertOne(db, collectionName, doc) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.getCollection(db, collectionName);
            if (c) {
                return yield c.insertOne(doc);
            }
            else {
                return null;
            }
        });
    }
    updateOne(db, collectionName, query, update) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.getCollection(db, collectionName);
            if (c) {
                return yield c.updateOne(query, update);
            }
            else {
                return null;
            }
        });
    }
    bulkUpdate(db, collectionName, items, options) {
        return __awaiter(this, void 0, void 0, function* () {
            const c = yield this.getCollection(db, collectionName);
            const clonedArray = [...items];
            const a = [];
            clonedArray.forEach(item => {
                let query = item.query;
                let doc = item.data;
                query = this.convertIdFields(query);
                doc = this.convertIdFields(doc);
                a.push({ updateOne: { filter: query, update: { $set: doc }, upsert: true } });
            });
            if (a && a.length > 0) {
                return yield c.bulkWrite(a, options);
            }
            else {
                return null;
            }
        });
    }
    /**
     *
     * @param doc
     * @param fieldName
     */
    convertIdField(doc, fieldName) {
        if (doc && doc.hasOwnProperty(fieldName)) {
            const body = doc[fieldName];
            if (body && body.hasOwnProperty('$in')) {
                let a = body['$in'];
                const arr = [];
                a.map((id) => {
                    if (typeof id === "string" && mongodb_1.ObjectId.isValid(id)) {
                        arr.push(new mongodb_1.ObjectID(id));
                    }
                    else {
                        arr.push(id);
                    }
                });
                doc[fieldName] = { $in: arr };
            }
            else if (typeof body === "string" && mongodb_1.ObjectId.isValid(body)) {
                doc[fieldName] = new mongodb_1.ObjectID(body);
            }
        }
        return doc;
    }
    /**
     *
     * @param doc
     */
    convertIdFields(doc) {
        doc = this.convertIdField(doc, '_id');
        doc = this.convertIdField(doc, 'userId');
        doc = this.convertIdField(doc, 'areaId');
        doc = this.convertIdField(doc, 'paymentId');
        doc = this.convertIdField(doc, 'categoryId');
        doc = this.convertIdField(doc, 'merchantId');
        doc = this.convertIdField(doc, 'merchantAccountId');
        doc = this.convertIdField(doc, 'clientId');
        doc = this.convertIdField(doc, 'productId');
        doc = this.convertIdField(doc, 'mallId');
        doc = this.convertIdField(doc, 'accountId');
        doc = this.convertIdField(doc, 'orderId');
        doc = this.convertIdField(doc, 'fromId');
        doc = this.convertIdField(doc, 'toId');
        if (doc && doc.hasOwnProperty('$or')) {
            const items = [];
            doc['$or'].map((it) => {
                if (it && it.hasOwnProperty('toId') && typeof it.toId === 'string' && it.toId.length === 24) {
                    items.push({ toId: new mongodb_1.ObjectID(it.toId) });
                }
                else if (it && it.hasOwnProperty('fromId') && typeof it.fromId === 'string' && it.fromId.length === 24) {
                    items.push({ fromId: new mongodb_1.ObjectID(it.fromId) });
                }
                else {
                    items.push(it);
                }
            });
            doc['$or'] = items;
        }
        if (doc && doc.hasOwnProperty('items')) {
            doc['items'].map((it) => {
                if (it && it.hasOwnProperty('productId')) {
                    const productId = it.productId;
                    if (typeof productId === 'string' && productId.length === 24) {
                        it.productId = new mongodb_1.ObjectID(productId);
                    }
                }
            });
        }
        if (doc && doc.hasOwnProperty('ownerIds')) {
            const ids = [];
            doc['ownerIds'].map((id) => {
                if (id) {
                    if (typeof id === 'string' && id.length === 24) {
                        ids.push(new mongodb_1.ObjectID(id));
                    }
                }
            });
            doc['ownerIds'] = ids;
        }
        return doc;
    }
}
exports.MongoDB = MongoDB;
//# sourceMappingURL=mongo.js.map