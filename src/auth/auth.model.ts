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

    async getUserByTokenId(tokenId: string): Promise<IModelResult<UserModel>> {
        const JWT_SECRET: any = process.env.JWT_SECRET;
        try {
            const _id = jwt.verify(tokenId, JWT_SECRET);
            if (_id) {
                const {data} = await this.userModel.findOne({ _id });
                if(data){
                    delete data.password;
                    return { data, error: null};
                }else{
                    return { data: null, error: 'Authentication Failed'};
                }
            } else {
                return { data: null, error: 'Invalid token'};
            }
        } catch (error) {
            throw new Error(`Authentication exception: ${error}`);
        }
    }

    async login(credential: any): Promise<IModelResult<string>> {
        const JWT_SECRET: any = process.env.JWT_SECRET;
        const email = credential.email;
        try {
            const {data} = await this.findOne({email});
            if(data){
                const athenticated = bcrypt.compareSync(credential.password, data.password);
                if(athenticated){
                    return { data: jwt.sign(data.userId.toString(), JWT_SECRET), error: null};
                }else{
                    return { data: null, error: 'Authentication Failed'};
                }
            }else{
                return { data: null, error: 'Authentication Failed'};

            }
        } catch (error) {
            throw new Error(`Exception: ${error}`);
        }
    }

    async signup(d: any): Promise<any> {
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
            throw new Error(`signup exception: ${error}`);
        }
    }
}