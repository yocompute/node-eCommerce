import express, { Request, Response } from "express";
import { ProductController } from "../controllers/product";
import { Product } from "../entity/Product";
import { parseQuery } from "../middlewares/parse-query";

export function ProductRoute(connection: any){
  const router = express.Router();
  const controller = new ProductController({connection, sse: undefined});
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find<Product>(req, res); });

  return router;
}