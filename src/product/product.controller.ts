
import { Request, Response } from "express";
// import * as core from 'express-serve-static-core';
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { IModelResult } from "../model";

import { IFileRequest, IPicture, UploaderModel } from "../uploader/uploader.model";
import { IProduct } from "./product.entity";
import { ProductModel } from "./product.model";



type SendProduct<T = Response> = (body?: IModelResult<IProduct>) => T;

interface ProductResponse extends Response {
  json: SendProduct<this>;
}

export class ProductController extends Controller<IProduct> {
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
  // async find(req: Request, res: Response): Promise<void> {
  //   const query: core.Query = req.query;

  //   // mongoose
  //   const r = await this.productModel.find(query);

  //   res.setHeader('Content-Type', 'application/json');
  //   res.send(r);
  // }


  async upload(req: IFileRequest, res: Response): Promise<ProductResponse> {
    const productId = req.params.id;
    const r = await this.productModel.findOne({ _id: productId });

    const defaultFilename = `${req.fileInfo.filename}`;
    const projectPath = process.cwd();
    const srcPath = `${projectPath}/${process.env.AWS_S3_PATH}/${defaultFilename}`;
    const ret: IModelResult<IPicture> = await UploaderModel.saveToAws(defaultFilename, srcPath);

    const product = r.data;
    if (product) {
      if (!product.pictures) {
        product.pictures = [ ret.data || {name: '', url: ''} ];
      }else if( product.pictures.length === 0){
        product.pictures[0] = ret.data || {name: '', url: ''};
      }

      try {
        await this.productModel.updateOne({ _id: productId }, product);
      } catch (e) {
        console.error(e);
        throw new Error(`${e}`);
      }
    }

    return res.json({
      error: '',
      data: product,
    });
  }
}