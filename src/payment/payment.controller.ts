import { Request, Response } from "express";
// import SSE from "express-sse-ts";

import { Controller } from "../controller";
import { PaymentModel } from "./payment.model";

export class PaymentController extends Controller {
    paymentModel;
    constructor(model: PaymentModel) {
        super(model);
        this.paymentModel = model;
    }

    /**
    * 
    * @param req 
    * @param res 
    */
    async find(req: Request, res: Response): Promise<void> {
        const query: any = req.query;

        // mongoose
        const r = await this.paymentModel.find(query);

        res.setHeader('Content-Type', 'application/json');
        res.send(r);
    }
}