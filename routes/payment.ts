// import express, { Request, Response } from "express";
// import { DataBase } from "../dbs";
// import { PaymentController } from "../controllers/payment";
// import { parseQuery } from "../middlewares/parse-query";

// export function PaymentRoute(db: DataBase, sse: any){
//   const router = express.Router();
//   const controller = new PaymentController({db, sse});
  
//   router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
//   router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
//   router.post('/', [parseQuery], (req:Request, res:Response) => { controller.insertOne(req, res); });


//   router.post('/notify/moneris', (req, res) => controller.notify);
//   return router;
// }