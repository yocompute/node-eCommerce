import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { CategoryController } from "./category.controller";
import { CategoryModel } from "./category.model";

export function CategoryRoute(){
  const router = express.Router();
  const model: CategoryModel = new CategoryModel({});
  const controller = new CategoryController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  return router;
}