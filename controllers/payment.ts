import {Request, Response} from "express";

import { Payment } from "../models/payment";
import { Controller, IControllerParams, Code } from "./index";
import { DataBase } from "../dbs";
import { Model } from "../models";

export class PaymentController extends Controller {

  constructor(params: IControllerParams) {
    super(new Payment(params.db, params.sse), params);
  }

  async insertOne(req: Request, res: Response): Promise<void> {
    const d = req.body.data;
    let code = Code.FAIL;
    let data = null;
    try {
      if (req.body) {
        // insert to payment table
        const r = await this.model.insertOne(d);
        // split to orders and insert to order table

        // pay by pament gateway

        // send envent to backoffice
        if(this.sse){

        }

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


  async notify(req: Request, res: Response): Promise<void> {
    let code = Code.FAIL;
    let data = null;
    
    res.setHeader("Content-Type", "application/json");

    res.send({
      code,
      data,
    });
  }
}