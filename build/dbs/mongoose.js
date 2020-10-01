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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
class Mongoose {
    // MongooseModel; // mongoose.Model<any>;
    // constructor(){
    //     // const Schema = new mongoose.Schema(definition, {versionKey: false});
    //     // this.MongooseModel = mongoose.model(name, Schema);
    // }
    connection(username, password, port, dbName) {
        return __awaiter(this, void 0, void 0, function* () {
            const connectionStr = username && password ?
                `mongodb://${username}:${password}@localhost:${port}/${dbName}?authSource=admin` : `mongodb://localhost:${port}/${dbName}?authSource=admin`;
            const options = {
                // poolSize: cfg.POOL_SIZE,
                useNewUrlParser: true,
                useUnifiedTopology: true
            };
            return yield mongoose_1.default.connect(connectionStr, options);
        });
    }
    getModel(tableName, definition) {
        const Schema = new mongoose_1.default.Schema(definition, { versionKey: false });
        return mongoose_1.default.model(tableName, Schema);
    }
    // create(data){
    //     const model = new this.MongooseModel(data);
    //     model.save();
    // }
    find(model, query, options = null) {
        return new Promise(resolve => {
            model.find(query, null, options, (err, res) => {
                resolve(res);
            });
        });
    }
    findOne(model, query, options = null) {
        return new Promise(resolve => {
            model.findOne(query, null, options, (err, res) => {
                resolve(res);
            });
        });
    }
}
exports.Mongoose = Mongoose;
//# sourceMappingURL=mongoose.js.map