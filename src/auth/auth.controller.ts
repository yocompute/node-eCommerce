import {Request, Response} from "express";
import { BrandModel } from "../brand/brand.model";
import { Controller } from "../controller";
import { IModelResult } from "../model";
import { IUser } from "../user/user.entity";
import { IAuth } from "./auth.entity";
import { AuthModel } from "./auth.model";

export class AuthController extends Controller<IAuth> {
    brandModel: BrandModel = new BrandModel({});

    constructor(model: AuthModel) {
        super(model);
    }

    async getUserByTokenId(req: Request, res: Response) : Promise<void>{
        const tokenId: string = req.params.tokenId;
        res.setHeader("Content-Type", "application/json");
        if (tokenId) {
            try{
                const r: IModelResult<IUser> = await (<AuthModel>this.model).getUserByTokenId(tokenId);
                if(r.data){
                    res.status(200).send(r);
                }else{
                    res.status(403).send(r);
                }
            }catch(error){
                res.status(500).send({data: null, error: error.message});
            }
        } else {
            res.status(400).send({data: null, error: 'No data in request'});
        }
    }

    async login(req: Request, res: Response): Promise<void> {
        const d = req.body;
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            try {
                const r: IModelResult<string> = await (<AuthModel>this.model).loginByEmail(d.email, d.password);
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
                const r = await (<AuthModel>this.model).signup(d.email, d.username, d.password);
                res.status(200).send(r);
            }catch(error){
                res.status(500).send(error);
            }
        } else {
            res.status(204).send({error: 'no data in request'})
        }
    }

    async signupBrand(req: Request, res: Response): Promise<void> {
        const d = req.body;
        res.setHeader("Content-Type", "application/json");
        if (req.body) {
            try{
                const r: IModelResult<string> = await (<AuthModel>this.model).signup(d.email, d.brand, d.password);
                if(!r.error){
                    const {data, error} = await (<AuthModel>this.model).getUserByTokenId(r.data || '');
                    if(!error){
                        const brand = { 
                            name: d.brand,
                            description: '',
                            pictures: [],
                            status: 'A',
                            owner: data?._id,
                            createUTC: new Date(),
                        }
                        await this.brandModel.insertOne(brand);
                        res.status(200).send(r);
                    }else{
                        res.status(500).send({data:'', error: 'Invalid token'});
                    }
                }else{
                    res.status(409).send(r); // Conflict
                }
            }catch(error){
                res.status(500).send(error);
            }
        } else {
            res.status(204).send({error: 'no data in request'})
        }
    }
}