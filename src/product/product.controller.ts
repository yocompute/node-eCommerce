import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { ProductModel } from "./product.model";

export class ProductController extends Controller {
    productModel;
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
}