import express, { Request, Response } from "express";
import { DataBase } from "../dbs";
import { ProductController } from "../controllers/product";
import { parseQuery } from "../middlewares/parse-query";

export function ProductRoute(db: DataBase){
  const router = express.Router();
  const controller = new ProductController({db, sse: undefined});
  
  router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });

  return router;
}