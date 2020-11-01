import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";

export function PaymentRoute(connection: any, sse: any){
  const router = express.Router();
  // const controller = new PaymentController({db, sse});
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  // router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  // router.post('/', [parseQuery], (req:Request, res:Response) => { controller.insertOne(req, res); });

  return router;
}