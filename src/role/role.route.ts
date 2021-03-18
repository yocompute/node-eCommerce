import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { RoleController } from "./role.controller";
import { RoleModel } from "./role.model";

export function RoleRoute(): express.Router {
  const router = express.Router();
  const model = new RoleModel({});
  const controller = new RoleController(model);

  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req: Request, res: Response) => { controller.find(req, res); });
  router.post('/', (req: Request, res: Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req: Request, res: Response) => { controller.updateOne(req, res); });
  return router;
}