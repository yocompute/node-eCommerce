import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { AuthController } from "./auth.controller";
import { AuthModel } from "./auth.model";

export function AuthRoute(){
  const router = express.Router();
  const model = new AuthModel({});
  const controller = new AuthController(model);
  
  router.post('/login', (req:Request, res:Response) => { controller.login(req, res); });
  router.post('/signup', (req:Request, res:Response) => { controller.signup(req, res); });

  return router;
}