// import { Request, Response } from "express";
// import * as core from 'express-serve-static-core';
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { IOrder } from "./order.entity";
import { OrderModel } from "./order.model";

export class OrderController extends Controller<IOrder> {
    orderModel: OrderModel;
    constructor(model: OrderModel) {
        super(model);
        this.orderModel = model;
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    // async find(req: Request, res: Response): Promise<void> {
    //     const query: core.Query = req.query;

    //     // mongoose
    //     const r = await this.orderModel.find(query);

    //     res.setHeader('Content-Type', 'application/json');
    //     res.send(r);
    // }
}