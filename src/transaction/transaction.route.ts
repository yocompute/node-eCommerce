import express, { Request, Response, Router } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { TransactionController } from "./transaction.controller";
import { TransactionModel } from "./transaction.model";

export function TransactionRoute() : Router{
  const router = express.Router();
  const model: TransactionModel = new TransactionModel({});
  const controller = new TransactionController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  return router;
}