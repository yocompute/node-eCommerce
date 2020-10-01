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

    find(model: any, query:any, options=null){
        return new Promise(resolve => {
            model.find(query, null, options, (err:any, res: any)=>{
                resolve(res);
            });
        })
    }

    findOne(model: any, query:any, options=null){
        return new Promise(resolve => {
            model.findOne(query, null, options, (err:any, res: any)=>{
                resolve(res);
            });
        })
    }

    // // by example: {target:"$targetId", source: "$sourceId", type: "$type"}
    // groupCount(by){
    //     return this.MongooseModel.aggregate([{$group:{_id: by, count:{$sum:1}}}]);
    // }
}