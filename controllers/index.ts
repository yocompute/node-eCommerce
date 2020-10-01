import {Request, Response} from "express";
import { Model } from "../models";
import { DataBase } from "../dbs";
import SSE from "express-sse-ts";

export const Code = {
  SUCCESS: 'success',
  FAIL: 'fail'
}

export interface IControllerParams{
  db: DataBase,
  sse?: SSE
}

export class Controller {
  public model: Model;
  public db: DataBase;
  public sse?: SSE;

  constructor(model: any, params: IControllerParams) {
    this.db = params.db;
    this.sse = params.sse;
    this.model = model;
  }

  /**
  * 
  * @param req 
  * @param res 
  */
  async find(req: Request, res: Response):Promise<void> { 
    const where: any = req.query.where;
    const options: any = req.query.options;
    let data: any = [];
    let code = Code.FAIL;
    res.setHeader('Content-Type', 'application/json');
    
    try {
      if(where){
        const r = await this.model.find(where, options);
        code = Code.SUCCESS;
        data = r;
      } else{
        const r = await this.model.find({}, options)
        code = Code.SUCCESS;
        data = r;
      }
      res.send({ code, data });
    } catch (error) {
      console.log(`list error: ${error.message}`);
      res.send({ code, data });
    }
  }

  /**
   * 
   * @param req 
   * @param res 
   */
  async getById(req: Request, res: Response):Promise<void>  {
    const id = req.params.id;
    let data:any = {};
    let code = Code.FAIL;
    const options: any = ( req.query && req.query.options ) || {};
    
    res.setHeader('Content-Type', 'application/json');

    try {
      data = await this.model.findOne({_id: id}, null);
      code = Code.SUCCESS;
      res.send({ code, data });
    } catch (error) {
      // logger.error(`get error : ${error}`);
    } finally {
      res.send({ code, data });
    }
  }


  async insertOne(req: Request, res: Response): Promise<void> {
    const d = req.body.data;
    let code = Code.FAIL;
    let data = null;
    try {
      if (req.body) {
        const r = await this.model.insertOne(d);
        if (r) {
          code = Code.SUCCESS;
          data = r; // r.upsertedId ?
        } else {
          code = Code.FAIL;
        }
      }
    } catch (error) {
      // logger.error(`updateOne error: ${error}`);
    } finally {
      res.setHeader("Content-Type", "application/json");
      res.send({
        code,
        data,
      });
    }
  }

  async updateOne(req: Request, res: Response): Promise<void> {
    const _id = req.params.id;
    const updates = req.body.data;
    let code = Code.FAIL;
    let data = _id;
    try {
      if (req.body) {
        const r = await this.model.updateOne( 
          {_id},
          updates
        );
        if (r) {
          code = Code.SUCCESS;
          data = _id; // r.upsertedId ?
        } else {
          code = Code.FAIL;
          data = _id;
        }
      }
    } catch (error) {
      // logger.error(`updateOne error: ${error}`);
    } finally {
      res.setHeader("Content-Type", "application/json");
      res.send({
        code,
        data,
      });
    }
  }
}