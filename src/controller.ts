import { Request, Response } from "express";
import SSE from "express-sse-ts";
// import { Connection, Repository, EntityTarget, FindManyOptions } from "typeorm";
import { Model } from './model';

export const Code = {
    SUCCESS: 'success',
    FAIL: 'fail'
}

export interface IControllerParams {
    // connection: Connection,
    sse?: SSE
}


export class Controller {
    public model: Model;

    constructor(model: any) {
        this.model = model;
    }

    /**
     * 
     * @param req 
     */
    getAuthToken(req: Request) {
        const s: any = req.get("Authorization");
        if (!s) {
            return null;
        } else if (s.indexOf('Bearer') !== -1) {
            return s.slice(7); // to remove 'Bear '
        } else {
            return s;
        }
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    async find(req: Request, res: Response): Promise<void> {
        const query: any = req.query;

        // mongoose
        const r = await this.model.find(query);

        res.setHeader('Content-Type', 'application/json');
        res.send(r);
    }

    async insertOne(req: Request, res: Response): Promise<void> {
        const d = req.body;
        let code = Code.FAIL;
        let data = '';
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            const r = await this.model.save(d);
            res.send(r);
        } else {
            res.send({
                code,
                data,
                error: 'no data to save'
            })
        }
    }

    async updateOne(req: Request, res: Response): Promise<void> {
        const id = req.params.id;
        const updates = { $set: { ...req.body, updateUTC: new Date() } };
        let code = Code.FAIL;
        let data = '';
        res.setHeader("Content-Type", "application/json");
        if (updates) {
            const r = await this.model.updateOne({ _id: id }, updates);
            res.send(r);
        } else {
            res.send({
                code,
                data,
                error: 'no field to update'
            })
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
}