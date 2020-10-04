import {cfg} from "../config"
import { MongoDB } from "./mongo";
import { Mongoose } from "./mongoose";

export class DataBase {
    mongo: any;
    dbInstance: any;

    construct(){
        if(cfg.DB_LAYER === 'mongoose'){
            this.mongo = new Mongoose();
        }else{
            this.mongo = new MongoDB();
        }
    }

    /**
     * 
     * @param username 
     * @param password 
     * @param port 
     * @param dbName 
     */
    async connect(username: string, password: string, port: number, dbName: string){
        if(cfg.DB_LAYER === 'mongoose'){
            const r: any = await this.mongo.connect(username, password, port, dbName);
            // this.dbInstance = r.db;
        }else{
        const r: any = await this.mongo.connect(username, password, port, dbName);
        this.dbInstance = r.db;
        }
    }

    /**
     *  Mongoose specific
     * @param tableName 
     * @param definition 
     */
    getModel(tableName: string, definition: any){
        if(cfg.DB_LAYER === 'mongoose'){
            return this.mongo.getModel(tableName, definition);
        }else{
            return null;
        }
    }

    async find(collectionName: string, query: any, options: any) {
        if(cfg.DB_LAYER === 'mongoose'){

        }else{
        const q = this.mongo.convertIdFields(query);
        return await this.mongo.find(this.dbInstance, collectionName, q);
        }
    }

    async findOne(collectionName: string, query: any, options: any) {
        if(cfg.DB_LAYER === 'mongoose'){

        }else{
        const q = this.mongo.convertIdFields(query);
        return await this.mongo.findOne(this.dbInstance, collectionName, q);
        }
    }

    async insertOne(collectionName: string, doc: any) {
        const d = this.mongo.convertIdFields(doc);
        return await this.mongo.insertOne(this.dbInstance, collectionName, d);
    }

    async updateOne(collectionName: string, query: any, doc:any) {
        const q = this.mongo.convertIdFields(query);
        const d = this.mongo.convertIdFields(doc);
        return await this.mongo.updateOne(this.dbInstance, collectionName, q, d);
    }
}