import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IModelParams, IModelResult, Model } from "../model";
import { Auth, IAuth } from "./auth.entity";
import { cfg } from '../config';

import { IUser, User } from '../user/user.entity';


export class AuthModel extends Model<IAuth> {
    userModel: Model<IUser>;
    
    constructor(params: IModelParams) {
        super(Auth, params);

        this.userModel = new Model<IUser>(User, {});
    }

    async getUserByTokenId(tokenId: string): Promise<IModelResult<IUser>> {
        const JWT_SECRET: string = process.env.JWT_SECRET || '';
        try {
            const _id = jwt.verify(tokenId, JWT_SECRET);
            if (_id) {
                const {data} = await this.userModel.findOne({ _id });
                if(data){
                    // delete data.password;
                    return { data, error: null};
                }else{
                    return { error: 'Authentication Failed'};
                }
            } else {
                return { error: 'Invalid token'};
            }
        } catch (error) {
            throw new Error(`Authentication exception: ${error}`);
        }
    }

    async loginByEmail(email: string, password: string): Promise<IModelResult<string>> {
        const JWT_SECRET: string = process.env.JWT_SECRET || '';
        try {
            const {data} = await this.findOne({email});
            if(data){
                const athenticated = bcrypt.compareSync(password, data.password);
                if(athenticated){
                    return { data: jwt.sign(data.user.toString(), JWT_SECRET), error: null};
                }else{
                    return { error: 'Authentication Failed' };
                }
            }else{
                return { error: 'Authentication Failed' };

            }
        } catch (error) {
            throw new Error(`Exception: ${error}`);
        }
    }

    async signup(email: string, username: string, password: string, roles: string[]): Promise<IModelResult<string>> {
        let tokenId = '';
        let error = '';
        const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

        try {

            const {data} = await this.find({ email });

            if (data && data.length > 0) { // duplicated email
                return { error: 'The email was already registered.'}
            } else {
                await this.userModel.insertOne({
                    username,
                    email,
                    balance: 0,
                    roles,
                    createUTC: new Date()
                });

                const {data} = await this.userModel.findOne({ email: email });
                if(data){
                    const hashed = await bcrypt.hash(password, cfg.N_SALT_ROUNDS);
                    const user: string = data._id.toString(); 
                    await this.insertOne({
                        user,
                        email: email,
                        password: hashed
                    });
                    tokenId = jwt.sign(user.toString(), JWT_SECRET || '');
                }else{
                    error = 'Signup fail';
                }
            }

            return { data: tokenId, error };
        } catch (error) {
            throw new Error(`signup exception: ${error}`);
        }
    }
}