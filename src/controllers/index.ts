import {Request, Response} from "express";
import SSE from "express-sse-ts";
import { Connection, Repository, EntityTarget, FindManyOptions } from "typeorm";

export const Code = {
  SUCCESS: 'success',
  FAIL: 'fail'
}

export interface IControllerParams{
  connection: Connection,
  sse?: SSE
}


export class Controller {
  public connection: Connection;
  public sse?: SSE;
  public entity: any;

  constructor(entity: any, params: IControllerParams) {
    this.connection = params.connection;
    this.sse = params.sse;
    this.entity = entity;
  }

  /**
   * 
   * @param req 
   */
  getAuthToken(req: Request){
    const s: any = req.get("Authorization");
    if (!s) {
      return null;
    }else if(s.indexOf('Bearer') !== -1){
      return s.slice(7); // to remove 'Bear '
    }else{
      return s;
    }
  }

  /**
  * 
  * @param req 
  * @param res 
  */
  async find<T>(req: Request, res: Response):Promise<void> { 
    const query: FindManyOptions = req.query;
    let data: any = [];
    let code = Code.FAIL;
    res.setHeader('Content-Type', 'application/json');
    
    try {
      const repo: Repository<T> = this.connection.getRepository(this.entity);
      const r = await repo.find(query);
      code = Code.SUCCESS;
      data = r;
      res.send({ code, data });
    } catch (error) {
      console.log(`list error: ${error.message}`);
      res.send({ code, data });
    }
  }

  // /**
  //  * 
  //  * @param req 
  //  * @param res 
  //  */
  // async getById(req: Request, res: Response):Promise<void>  {
  //   const id = req.params.id;
  //   let data:any = {};
  //   let code = Code.FAIL;
  //   const options: any = ( req.query && req.query.options ) || {};
    
  //   res.setHeader('Content-Type', 'application/json');

  //   try {
  //     data = await this.model.findOne({_id: id}, null);
  //     code = Code.SUCCESS;
  //     res.send({ code, data });
  //   } catch (error) {
  //     // logger.error(`get error : ${error}`);
  //   } finally {
  //     res.send({ code, data });
  //   }
  // }


  // async insertOne(req: Request, res: Response): Promise<void> {
  //   const d = req.body.data;
  //   let code = Code.FAIL;
  //   let data = null;
  //   try {
  //     if (req.body) {
  //       const r = await this.model.insertOne(d);
  //       if (r) {
  //         code = Code.SUCCESS;
  //         data = r; // r.upsertedId ?
  //       } else {
  //         code = Code.FAIL;
  //       }
  //     }
  //   } catch (error) {
  //     // logger.error(`updateOne error: ${error}`);
  //   } finally {
  //     res.setHeader("Content-Type", "application/json");
  //     res.send({
  //       code,
  //       data,
  //     });
  //   }
  // }

  // async updateOne(req: Request, res: Response): Promise<void> {
  //   const _id = req.params.id;
  //   const updates = req.body.data;
  //   let code = Code.FAIL;
  //   let data = _id;
  //   try {
  //     if (req.body) {
  //       const r = await this.model.updateOne( 
  //         {_id},
  //         updates
  //       );
  //       if (r) {
  //         code = Code.SUCCESS;
  //         data = _id; // r.upsertedId ?
  //       } else {
  //         code = Code.FAIL;
  //         data = _id;
  //       }
  //     }
  //   } catch (error) {
  //     // logger.error(`updateOne error: ${error}`);
  //   } finally {
  //     res.setHeader("Content-Type", "application/json");
  //     res.send({
  //       code,
  //       data,
  //     });
  //   }
  // }
}