import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { ProductController } from "./product.controller";
import { ProductModel } from "./product.model";

export function ProductRoute(){
  const router = express.Router();
  const model: ProductModel = new ProductModel({});
  const controller = new ProductController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  return router;
}