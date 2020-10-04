
import { DataBase } from "../dbs";
import {cfg} from "../config"

export class Model {
  db: DataBase;
  tableName: string;
  definition: any;
  mongooseModel: any;

  /**
   * 
   * @param db --- connected db
   * @param tableName 
   * @param definition 
   */
  constructor(db: DataBase, tableName: string, definition = null) {
    this.db = db;
    this.tableName = tableName;
    this.definition = definition; // optional

    if(cfg.DB_LAYER === 'mongoose'){
      this.mongooseModel = this.db.getModel(tableName, definition);
    }else{
    }
  }

  /**
   * 
   * @param query 
   * @param options 
   */
  async find(query: any, options?: any) {
    if(cfg.DB_LAYER === 'mongoose'){
      return await this.db.find(this.mongooseModel, this.tableName, query);
    }else{
      return await this.db.find(this.tableName, query, options);
    }
  }

  /**
   * 
   * @param query 
   * @param options 
   */
  async findOne(query: any, options?: any) {
    if(cfg.DB_LAYER === 'mongoose'){
      return await this.db.findOne(this.mongooseModel, this.tableName, query);
    }else{
      return await this.db.findOne(this.tableName, query, options);
    }
  }


  /**
   * 
   * @param doc 
   * @param options 
   */
   async insertOne(doc: any, options?: any) {
    return await this.db.insertOne(this.tableName, doc);
  }

    /**
   * 
   * @param query 
   * @param options 
   */
   async updateOne(query: any, update: any) {
    return await this.db.updateOne(this.tableName, query, update);
  }
}