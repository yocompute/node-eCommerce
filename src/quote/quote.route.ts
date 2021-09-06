import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { QuoteController } from "./quote.controller";
import { QuoteModel } from "./quote.model";
// import { MulterUploader } from "../middlewares/uploader";
// import { IFileRequest } from "../uploader/uploader.model";

export function QuoteRoute(): express.Router {
  const router = express.Router();
  const model: QuoteModel = new QuoteModel({});
  const controller = new QuoteController(model);

  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req: Request, res: Response) => { controller.find(req, res); });
  router.post('/', (req: Request, res: Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req: Request, res: Response) => { controller.updateOne(req, res); });
//   router.post('/upload/:id', MulterUploader.single("upload"), (req: IFileRequest) => { controller.upload(req) });

  return router;
}