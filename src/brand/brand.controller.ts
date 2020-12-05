import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { BrandModel } from "./brand.model";

export class BrandController extends Controller {
    brandModel;
    constructor(model: BrandModel) {
        super(model);
        this.brandModel = model;
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    async find(req: Request, res: Response): Promise<void> {
        const query: any = req.query;

        // mongoose
        const r = await this.brandModel.find(query);

        res.setHeader('Content-Type', 'application/json');
        res.send(r);
    }
}