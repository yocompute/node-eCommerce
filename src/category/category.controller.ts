import { Request, Response } from "express";
import * as core from 'express-serve-static-core';
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { CategoryModel } from "./category.model";

export class CategoryController extends Controller {
    categoryModel;
    constructor(model: CategoryModel) {
        super(model);
        this.categoryModel = model;
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    async find(req: Request, res: Response): Promise<void> {
        const query: core.Query = req.query;

        // mongoose
        const r = await this.categoryModel.find(query);

        res.setHeader('Content-Type', 'application/json');
        res.send(r);
    }
}