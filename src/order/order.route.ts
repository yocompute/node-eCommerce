import express, { Request, Response, Router } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { OrderController } from "./order.controller";
import { OrderModel } from "./order.model";

export function OrderRoute() : Router{
  const router = express.Router();
  const model: OrderModel = new OrderModel({});
  const controller = new OrderController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  router.delete('/:id', (req:Request, res:Response) => { controller.deleteOne(req, res); });
  return router;
}