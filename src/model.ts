
import SSE from "express-sse-ts";
import { Connection, Repository, EntityTarget, FindManyOptions, FindConditions } from "typeorm";

export const Code = {
  SUCCESS: 'success',
  FAIL: 'fail'
}

export interface IModelParams{
  connection: Connection,
  sse?: SSE
}

export interface IModelResult{
    code: string,
    data: any,
    error: string
}

export class Model {
  public connection: Connection;
  public sse?: SSE;
  public entity: any;

  constructor(entity: any, params: IModelParams) {
    this.connection = params.connection;
    this.sse = params.sse;
    this.entity = entity;
  }

  /**
  * 
  * @param req 
  * @param res 
  */
  async find(query: FindManyOptions): Promise<IModelResult> {
    let data: any = [];
    let code = Code.FAIL;
    try {
      const repo = this.connection.getRepository(this.entity);
      const r = await repo.find(query);
      code = Code.SUCCESS;
      data = r;
      return { code, data, error: '' };
    } catch (error) {
      return { code, data, error };
    }
  }


  /**
  * 
  * @param req 
  * @param res 
  */
  async save(entity: any): Promise<IModelResult> {
    let data: any = [];
    let code = Code.FAIL;
    try {
      const repo = this.connection.getRepository(this.entity);
      const r = await repo.save(entity);
      code = Code.SUCCESS;
      data = r;
      return { code, data, error: '' };
    } catch (error) {
      return { code, data, error };
    }
  }

  /**
  * 
  * @param req 
  * @param res 
  */
  async update(query: FindConditions<string>, updates: any): Promise<IModelResult> {
    let data: any = [];
    let code = Code.FAIL;
    try {
      const repo = this.connection.getRepository(this.entity);
      const r = await repo.update(query, updates);
      code = Code.SUCCESS;
      data = r;
      return { code, data, error: '' };
    } catch (error) {
      return { code, data, error };
    }
  }
}