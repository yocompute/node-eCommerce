// import express, { Request, Response, Router } from "express";
// import { parseQuery } from "../middlewares/parse-query";
// import { PayoutController } from "./payout.controller";
// import { PayoutModel } from "./payout.model";

// export function PayoutRoute() : Router{
//   const router = express.Router();
//   const model: PayoutModel = new PayoutModel({});
//   const controller = new PayoutController(model);
  
//   // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
//   router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
//   router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
//   router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
//   return router;
// }