import express, { Request, Response, Router } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { PaymentController } from "./payment.controller";
import { PaymentModel } from "./payment.model";

export function PaymentRoute() : Router{
  const router = express.Router();
  const model: PaymentModel = new PaymentModel({});
  const controller = new PaymentController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  return router;
}