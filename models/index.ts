
import { DataBase } from "../dbs";

export class Model {
  db: DataBase;
  tableName: string;
  definition: any;

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
  }

  /**
   * 
   * @param query 
   * @param options 
   */
  async find(query: any, options?: any) {
    return await this.db.find(this.tableName, query, options);
  }

  /**
   * 
   * @param query 
   * @param options 
   */
  async findOne(query: any, options?: any) {
    return await this.db.findOne(this.tableName, query, options);
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