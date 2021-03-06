import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { QrcodeController } from "./qrcode.controller";
import { QrcodeModel } from "./qrcode.model";
// import { MulterUploader } from "../middlewares/uploader";

export function QrcodeRoute(): express.Router {
  const router = express.Router();
  const model = new QrcodeModel({});
  const controller = new QrcodeController(model);
  
  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req:Request, res:Response) => { controller.find(req, res); });
  router.post('/', (req:Request, res:Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req:Request, res:Response) => { controller.updateOne(req, res); });
  // router.post('/upload/:id', MulterUploader.single("upload"), (req:Request, res:Response) => { controller.upload(req, res)});

  return router;
}