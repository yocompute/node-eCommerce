import express, { Request, Response, Router } from "express";
import { parseQuery } from "../middlewares/parse-query";
import { ProductController } from "./product.controller";
import { ProductModel } from "./product.model";
import { MulterUploader } from "../middlewares/uploader";

export function ProductRoute() : Router{
  const router = express.Router();
  const model: ProductModel = new ProductModel({});
  const controller = new ProductController(model);

  // router.get('/:id', [parseQuery], (req:Request, res:Response) => { controller.getById(req, res); });
  router.get('/', [parseQuery], (req: Request, res: Response) => { controller.find(req, res); });
  router.post('/', (req: Request, res: Response) => { controller.insertOne(req, res); });
  router.put('/:id', (req: Request, res: Response) => { controller.updateOne(req, res); });
  router.post('/upload/:id', MulterUploader.single("upload"), (req: Request, res: Response) => { controller.upload(req, res) });
  return router;
}