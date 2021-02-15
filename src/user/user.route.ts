import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { UserController } from "./user.controller";
import { UserModel } from "./user.model";

export function UserRoute() : express.Router {
  const router = express.Router();
  const model = new UserModel({});
  const controller = new UserController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  return router;
}