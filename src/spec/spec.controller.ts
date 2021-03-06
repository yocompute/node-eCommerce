// import { Request, Response } from "express";
// import * as core from 'express-serve-static-core';
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { ISpec } from "./spec.entity";
import { SpecModel } from "./spec.model";

export class SpecController extends Controller<ISpec> {
    specModel: SpecModel;
    constructor(model: SpecModel) {
        super(model);
        this.specModel = model;
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    // async find(req: Request, res: Response): Promise<void> {
    //     const query: core.Query = req.query;

    //     // mongoose
    //     const r = await this.specModel.find(query);

    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(r);
    // }

}