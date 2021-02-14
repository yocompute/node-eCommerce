

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
            try{
                const r = await this.authModel.getUserByTokenId(tokenId);
                if(r.data){
                    res.status(200).send(r);
                }else{
                    res.status(403).send(r);
                }
            }catch(error){
                res.status(500).send({error: error.message});
            }
        } else {
            res.status(400).send({error: 'No data in request'});
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const d = req.body;
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            try {
                const r = await this.authModel.login(d);
                if(r.data){
                    res.status(200).send(r);
                }else{
                    res.status(403).send(r);
                }
            }catch(error){
                res.status(500).send({error: error.message});
            }
        } else {
            res.status(400).send({error: 'No data in request'});
        }
    }

    async signup(req: Request, res: Response): Promise<void> {
        const d = req.body;
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            try{
                const r = await this.authModel.signup(d);
                res.status(200).send(r);
            }catch(error){
                res.status(500).send(error);
            }
        } else {
            res.status(204).send({error: 'no data in request'})
        }
    }
}