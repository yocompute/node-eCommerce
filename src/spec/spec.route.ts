import express, { Request, Response, Router } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { SpecController } from "./spec.controller";
import { SpecModel } from "./spec.model";

export function SpecRoute(): Router{
  const router = Router();
  const model: SpecModel = new SpecModel({});
  const controller = new SpecController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });

  return router;
}