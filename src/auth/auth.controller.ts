

import {Request, Response} from "express";
import { Controller, Code } from "../controller";
import { AuthModel } from "./auth.model";

export class AuthController extends Controller {
    authModel: AuthModel;

    constructor(model: AuthModel) {
        super(model);
        this.authModel = model;
    }

    async getUserByTokenId(req: Request, res: Response): Promise<any> {
        const tokenId = req.params.tokenId;
        res.setHeader("Content-Type", "application/json");
        if (tokenId) {
            const r = await this.authModel.getUserByTokenId(tokenId);
            res.send(r);
        } else {
            res.send({
                code: Code.FAIL,
                data:'',
                error: 'no field to update'
            })
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const d = req.body;
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            const r = await this.authModel.login(d);
            res.send(r);
        } else {
            res.send({
                code: Code.FAIL,
                data: '',
                error: 'no data to save'
            })
        }
    }

    async signup(req: Request, res: Response): Promise<void> {
        const d = req.body;
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            const r = await this.authModel.signup(d);
            res.send(r);
        } else {
            res.send({
                code: Code.FAIL,
                data: '',
                error: 'no data to save'
            })
        }
    }
}