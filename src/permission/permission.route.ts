import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { PermissionController } from "./permission.controller";
import { PermissionModel } from "./permission.model";

export function PermissionRoute() : express.Router {
  const router = express.Router();
  const model = new PermissionModel({});
  const controller = new PermissionController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  // router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  // router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  return router;
}