import express, { Request, Response } from "express";
// import { parseQuery } from "../middlewares/parse-query";
import { AuthController } from "./auth.controller";
import { AuthModel } from "./auth.model";

export function AuthRoute(){
  const router = express.Router();
  const model: AuthModel = new AuthModel({});
  const controller: AuthController = new AuthController(model);
  

  router.get('/:tokenId', (req:Request, res:Response) => { controller.getUserByTokenId(req, res); });
  router.post('/login', (req:Request, res:Response) => { controller.login(req, res); });
  router.post('/signup', (req:Request, res:Response) => { controller.signup(req, res); });

  router.post('/signupBrand', (req:Request, res:Response) => { controller.signupBrand(req, res); });

  return router;
}