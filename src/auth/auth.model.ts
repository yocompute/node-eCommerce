import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Code } from "../controller";
import { IModelParams, IModelResult, Model } from "../model";
import { Auth } from "./auth.entity";
import { cfg } from '../config';

import { User } from '../user/user.entity';
import { UserModel } from "../user/user.model";



export class AuthModel extends Model {
    userModel: UserModel;
    constructor(params: IModelParams) {
        super(Auth, params);

        this.userModel = new Model(User, {});
    }

    async getUserByTokenId(tokenId: string): Promise<IModelResult> {
        let code = Code.FAIL;
        let error = '';
        const JWT_SECRET: any = process.env.JWT_SECRET;
        try {
            const _id = jwt.verify(tokenId, JWT_SECRET);
            if (_id) {
                const {data} = await this.userModel.findOne({ _id });
                if(data){
                    delete data.password;
                }
                code = Code.SUCCESS;
                return { code, data, error };
            } else {
                return { code, data: null, error: 'Authentication Fail' };
            }
        } catch (error) {
            return { code, data: null, error: 'Authentication Exception: ${error}' };
        }
    }

    async login(credential: any): Promise<IModelResult> {
        let code = Code.FAIL;
        let tokenId = null;
        let error = '';
        const JWT_SECRET: any = process.env.JWT_SECRET;
        const email = credential.email;
        try {
            const {data} = await this.findOne({email});
            if(data){
                const athenticated = bcrypt.compareSync(credential.password, data.password);
                if(athenticated){
                    tokenId = jwt.sign(data.userId.toString(), JWT_SECRET);
                }else{
                    error = 'Authentication fail';
                }
            }

            code = Code.SUCCESS;
            return { code, data: tokenId, error };
        } catch (error) {
            return { code, data: tokenId, error };
        }
    }

    async signup(d: any): Promise<IModelResult> {
        let code = Code.FAIL;
        let tokenId = '';
        let error = '';
        const JWT_SECRET: any = process.env.JWT_SECRET;
        const email = d.email;

        try {
            // const authRepo = this.connection.getRepository(this.entity);
            // const userRepo = this.connection.getRepository(User);

            const {data} = await this.find({ email });

            if (data && data.length > 0) {
                // pass
            } else {
                await this.userModel.save({
                    username: d.username,
                    email: d.email,
                    balance: 0,
                    createUTC: new Date()
                });

                const {data} = await this.userModel.findOne({ email: d.email });
                if(data){
                    const password = await bcrypt.hash(d.password, cfg.N_SALT_ROUNDS);
                    const userId: any = data._id; 
                    await this.save({
                        userId,
                        email: d.email,
                        password
                    });
                    tokenId = jwt.sign(userId.toString(), JWT_SECRET);
                }else{
                    error = 'Signup fail';
                }
            }

            code = Code.SUCCESS;
            return { code, data: tokenId, error };
        } catch (error) {
            return { code, data: tokenId, error };
        }
    }
}