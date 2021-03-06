import express, { Request, Response } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { BrandController } from "./brand.controller";
import { BrandModel } from "./brand.model";
import { MulterUploader } from "../middlewares/uploader";
import { IFileRequest } from "../uploader/uploader.model";

export function BrandRoute(): express.Router {
  const router = express.Router();
  const model: BrandModel = new BrandModel({});
  const controller = new BrandController(model);

  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req: Request, res: Response) => { controller.find(req, res); });
  router.post('/', (req: Request, res: Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req: Request, res: Response) => { controller.updateOne(req, res); });
  router.post('/upload/:id', MulterUploader.single("upload"), (req: IFileRequest) => { controller.upload(req) });

  return router;
}