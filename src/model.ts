
import SSE from "express-sse-ts";
import { ObjectID } from "mongodb";
import mongoose from './db';
const { Types } = mongoose;

// import { Connection, Repository, EntityTarget, FindManyOptions, FindConditions } from "typeorm";

export const Code = {
  SUCCESS: 'success',
  FAIL: 'fail'
}

export interface IModelParams{
  // connection: Connection,
  sse?: SSE
}

export interface IModelResult<T>{
    data: T | null,
    error: string | null
}

export class Model {
  // public connection: Connection;
  public sse?: SSE;
  public entityClass: any;

  constructor(entityClass: any, params: IModelParams) {
    // this.connection = params.connection;
    this.sse = params.sse;
    this.entityClass = entityClass;
  }

  convertIds(where: any){
    const q: any = {};
    Object.keys(where).forEach(key => {
      if(typeof where[key] === 'string' && ObjectID.isValid(where[key])){
        q[key] = new Types.ObjectId(where[key]);
      }else{
        q[key] = where[key];
      }
    });
    return q;
  }

  async find(query: any): Promise<any> {
    let data: any = [];
    try {
      // typeorm
      // const repo = this.connection.getRepository(this.entity);
      // const r = await repo.find(query);

      // mongoose
      if(query){
        query = this.convertIds(query);
      }
      const rs = await this.entityClass.find(query);
      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async findOne(query: any): Promise<any> {
    let data: any = [];
    try {
      // typeorm
      // const repo = this.connection.getRepository(this.entity);
      // const r = await repo.findOne(query);

      // mongoose
      if(query){
        query = this.convertIds(query);
      }
      const {_doc} = await this.entityClass.findOne(query);
      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async save(entity: any): Promise<any> {
    let data: any = [];
    try {
      // typeorm
      // const repo = this.connection.getRepository(this.entity);
      // const r = await repo.save(entity);

      // mongoose
      const { _doc } = await this.entityClass.create(entity);
      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }


  async updateOne(query: any, updates: any): Promise<any> {
    let data: any = [];
    try {
      // typeorm
      // const repo = this.connection.getRepository(this.entity);
      // const r = await repo.update(query, updates);
      
      // mongoose
      const r = await this.entityClass.updateOne(query, updates);
      const {_doc} = await this.entityClass.findOne(query);
      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}