import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { Code } from "../model";
import { UploaderModel } from "../uploader/uploader.model";
import { ProductModel } from "./product.model";

export class ProductController extends Controller {
  productModel: ProductModel;
  constructor(model: ProductModel) {
    super(model);
    this.productModel = model;
  }

  /**
  * 
  * @param req 
  * @param res 
  */
  async find(req: Request, res: Response): Promise<void> {
    const query: any = req.query;

    // mongoose
    const r = await this.productModel.find(query);

    res.setHeader('Content-Type', 'application/json');
    res.send(r);
  }


  async upload(req: Request, res: Response) {
    const productId = req.params.id;
    const r = await this.productModel.findOne({ _id: productId });

    // @ts-ignore
    const defaultFilename = `${req.fileInfo.filename}`;
    const projectPath = process.cwd();
    const srcPath = `${projectPath}/${process.env.AWS_S3_PATH}/${defaultFilename}`;
    const ret: any = await UploaderModel.saveToAws(defaultFilename, srcPath);

    const product = r.data;
    if (product) {
      if (!product.pictures) {
        product.pictures = [ ret.data ];
      }else if( product.pictures.length === 0){
        product.pictures[0] = (ret.data);
      }

      try {
        await this.productModel.update({ _id: productId }, product);
      } catch (e) {
        console.error(e);
        return res.json({
          code: Code.FAIL,
        });
      }
    }

    return res.json({
      code: Code.SUCCESS,
      data: product,
    });
  }
}