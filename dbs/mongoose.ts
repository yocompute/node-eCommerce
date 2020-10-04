import mongoose from "mongoose";

export class Mongoose {
    // MongooseModel; // mongoose.Model<any>;

    // constructor(){
    //     // const Schema = new mongoose.Schema(definition, {versionKey: false});
    //     // this.MongooseModel = mongoose.model(name, Schema);
    // }

    async connection(username: string, password: string, port: number, dbName: string){
        const connectionStr = username && password ? 
        `mongodb://${username}:${password}@localhost:${port}/${dbName}?authSource=admin` : `mongodb://localhost:${port}/${dbName}?authSource=admin`;
      
        const options = {
            // poolSize: cfg.POOL_SIZE,
            useNewUrlParser: true,
            useUnifiedTopology: true
        };

        return await mongoose.connect(connectionStr, options);
    }

    getModel(tableName: string, definition: any){
        const Schema = new mongoose.Schema(definition, {versionKey: false});
        return mongoose.model(tableName, Schema);
    }

    // create(data){
    //     const model = new this.MongooseModel(data);
    //     model.save();
    // }

    // find(model: any, query:any, options=null){
    //     return new Promise(resolve => {
    //         model.find(query, null, options, (err:any, res: any)=>{
    //             resolve(res);
    //         });
    //     })
    // }

    // findOne(model: any, query:any, options=null){
    //     return new Promise(resolve => {
    //         model.findOne(query, null, options, (err:any, res: any)=>{
    //             resolve(res);
    //         });
    //     })
    // }

    // // by example: {target:"$targetId", source: "$sourceId", type: "$type"}
    // groupCount(by){
    //     return this.MongooseModel.aggregate([{$group:{_id: by, count:{$sum:1}}}]);
    // }


    async find(model: mongoose.Model<any>, collectionName: string, query: any) {
        if (model) {
            return await model.find(query);
        } else {
            return null;
        }
    }

    async findOne(model: mongoose.Model<any>, collectionName: string, query: any) {
        if (model) {
            return await model.findOne(query);
        } else {
            return null;
        }
    }

    async insertOne(model: mongoose.Model<any>, collectionName: string, doc: any) {
        if (model) {
            // return await model.save(doc);
        } else {
            return null;
        }
    }

    // async updateOne(model: mongoose.Model<any>, collectionName: string, query: any, update: any) {
    //     if (c) {
    //         return await c.updateOne(query, update);
    //     } else {
    //         return null;
    //     }
    // }

    // async bulkUpdate(db: Db, collectionName: string, items: any[], options?: any): Promise<any> {
    //     const c: Collection = await this.getCollection(db, collectionName);
    //     const clonedArray: any[] = [...items];
    //     const a: any[] = [];

    //     clonedArray.forEach(item => {
    //         let query = item.query;
    //         let doc = item.data;

    //         query = this.convertIdFields(query);
    //         doc = this.convertIdFields(doc);
    //         a.push({ updateOne: { filter: query, update: { $set: doc }, upsert: true } });
    //     });

    //     if (a && a.length > 0) {
    //         return await c.bulkWrite(a, options);
    //     } else {
    //         return null;
    //     }
    // }
}