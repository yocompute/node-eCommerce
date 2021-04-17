import { Model as MongooseModel, Document, FilterQuery, Query } from 'mongoose';
import SSE from "express-sse-ts";
import { ObjectID } from "mongodb";
import mongoose from './db';
const { Types } = mongoose;

export interface IModelParams {
  // connection: Connection,
  sse?: SSE
}

export interface IModelResult<T> {
  data: T | null,
  error: string | null
}

export class Model<T extends Document> {
  // public connection: Connection;
  public sse?: SSE;
  public model: MongooseModel<T>;

  constructor(model: MongooseModel<T>, params: IModelParams) {
    // this.connection = params.connection;
    this.sse = params.sse;
    this.model = model;
  }

  convertIds(where: any): any {
    const q: any = {};
    Object.keys(where).forEach(key => {
      if (typeof where[key] === 'string' && ObjectID.isValid(where[key])) {
        q[key] = new Types.ObjectId(where[key]);
      } else {
        q[key] = where[key];
      }
    });
    return q;
  }


  /**
   * Note: This function should be overwritten if it need populate
   * @param query 
   */
  async find(query: FilterQuery<any>): Promise<IModelResult<T[]>> {
    let data: T[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: any[] = await this.model.find(query);
      data = rs.map(r => r._doc);
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  /**
   * Note: This function should be overwritten if it need populate
   * @param query 
   */
  async findOne(query: FilterQuery<any>): Promise<IModelResult<T>> {
    let data: T;
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const r: any = await this.model.findOne(query);
      data = r._doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }


  async insertOne(entity: any): Promise<IModelResult<T>> {
    let data: T;
    try {
      const r: any = await this.model.create(entity);
      data = r._doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }


  async updateOne(query: FilterQuery<any>, updates: any): Promise<IModelResult<T>> {
    let data: T;
    try {
      await this.model.updateOne(query, updates);
      const r: any = await this.model.findOne(query);
      data = r._doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}