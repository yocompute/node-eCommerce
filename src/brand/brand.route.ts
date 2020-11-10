import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { BrandController } from "./brand.controller";
import { BrandModel } from "./brand.model";

export function BrandRoute(connection: any){
  const router = express.Router();
  const model = new BrandModel({connection, sse: undefined});
  const controller = new BrandController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  return router;
}