import { MongoDB } from "./mongo";

export class DataBase {
    mongo: MongoDB = new MongoDB();
    dbInstance: any;

    construct(){
    
    }

    /**
     * 
     * @param username 
     * @param password 
     * @param port 
     * @param dbName 
     */
    async connect(username: string, password: string, port: number, dbName: string){
        const r: any = await this.mongo.connect(username, password, port, dbName);
        this.dbInstance = r.db;
    }

    async find(collectionName: string, query: any, options: any) {
        const q = this.mongo.convertIdFields(query);
        return await this.mongo.find(this.dbInstance, collectionName, q);
    }

    async findOne(collectionName: string, query: any, options: any) {
        const q = this.mongo.convertIdFields(query);
        return await this.mongo.findOne(this.dbInstance, collectionName, q);
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