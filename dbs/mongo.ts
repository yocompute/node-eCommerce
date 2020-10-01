import { MongoClient, Db, Collection, ObjectID, ObjectId } from "mongodb";
import { cfg } from "../config";

export class MongoDB {
    db: Db | undefined;

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
    connect(username: string, password: string, port: number, dbName: string) {
        const connectionStr = username && password ?
            `mongodb://${username}:${password}@localhost:${port}/${dbName}?authSource=admin` : `mongodb://localhost:${port}/${dbName}?authSource=admin`;

        const options = {
            poolSize: cfg.DB_POOL_SIZE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        return new Promise((resolve, reject) => {
            MongoClient.connect(connectionStr, options).then((connectClient) => {
                const db: Db = this.getDb(connectClient, dbName);
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
    getDb(connection: MongoClient, dbName: string): Db {
        return connection.db(dbName);
    }

    /**
     * 
     * @param db 
     * @param collectionName 
     */
    getCollection(db: Db, collectionName: string): Promise<Collection> {
        return new Promise(res => {
            if (db) {
                const collection: Collection = db.collection(collectionName);
                if (collection) {
                    res(collection);
                } else {
                    db.createCollection(collectionName, (cc: any) => {
                        res(cc);
                    });
                }
            } else {
                res();
            }
        });
    }

    async find(db: Db, collectionName: string, query: any) {
        const c: Collection = await this.getCollection(db, collectionName);
        if (c) {
            return await c.find(query).toArray();
        } else {
            return null;
        }
    }

    async findOne(db: Db, collectionName: string, query: any) {
        const c: Collection = await this.getCollection(db, collectionName);
        if (c) {
            return await c.findOne(query);
        } else {
            return null;
        }
    }

    async insertOne(db: Db, collectionName: string, doc: any) {
        const c: Collection = await this.getCollection(db, collectionName);
        if (c) {
            return await c.insertOne(doc);
        } else {
            return null;
        }
    }

    async updateOne(db: Db, collectionName: string, query: any, update: any) {
        const c: Collection = await this.getCollection(db, collectionName);
        if (c) {
            return await c.updateOne(query, update);
        } else {
            return null;
        }
    }

    async bulkUpdate(db: Db, collectionName: string, items: any[], options?: any): Promise<any> {
        const c: Collection = await this.getCollection(db, collectionName);
        const clonedArray: any[] = [...items];
        const a: any[] = [];

        clonedArray.forEach(item => {
            let query = item.query;
            let doc = item.data;

            query = this.convertIdFields(query);
            doc = this.convertIdFields(doc);
            a.push({ updateOne: { filter: query, update: { $set: doc }, upsert: true } });
        });

        if (a && a.length > 0) {
            return await c.bulkWrite(a, options);
        } else {
            return null;
        }
    }

    /**
     * 
     * @param doc 
     * @param fieldName 
     */
    convertIdField(doc: any, fieldName: string) {
        if (doc && doc.hasOwnProperty(fieldName)) {
            const body = doc[fieldName];

            if (body && body.hasOwnProperty('$in')) {
                let a = body['$in'];
                const arr: any[] = [];
                a.map((id: any) => {
                    if (typeof id === "string" && ObjectId.isValid(id)) {
                        arr.push(new ObjectID(id));
                    } else {
                        arr.push(id);
                    }
                });

                doc[fieldName] = { $in: arr };
            } else if (typeof body === "string" && ObjectId.isValid(body)) {
                doc[fieldName] = new ObjectID(body);
            }
        }

        return doc;
    }

    /**
     * 
     * @param doc 
     */
    convertIdFields(doc: any) {
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
            const items: any[] = [];
            doc['$or'].map((it: any) => {
                if (it && it.hasOwnProperty('toId') && typeof it.toId === 'string' && it.toId.length === 24) {
                    items.push({ toId: new ObjectID(it.toId) });
                } else if (it && it.hasOwnProperty('fromId') && typeof it.fromId === 'string' && it.fromId.length === 24) {
                    items.push({ fromId: new ObjectID(it.fromId) });
                } else {
                    items.push(it);
                }
            });
            doc['$or'] = items;
        }

        if (doc && doc.hasOwnProperty('items')) {
            doc['items'].map((it: any) => {
                if (it && it.hasOwnProperty('productId')) {
                    const productId = it.productId;
                    if (typeof productId === 'string' && productId.length === 24) {
                        it.productId = new ObjectID(productId);
                    }
                }
            });
        }

        if (doc && doc.hasOwnProperty('ownerIds')) {
            const ids: ObjectID[] = [];
            doc['ownerIds'].map((id: any) => {
                if (id) {
                    if (typeof id === 'string' && id.length === 24) {
                        ids.push(new ObjectID(id));
                    }
                }
            });
            doc['ownerIds'] = ids;
        }

        return doc;
    }
}