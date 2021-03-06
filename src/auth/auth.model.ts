import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IModelParams, IModelResult, Model } from "../model";
import { Auth } from "./auth.entity";
import { cfg } from '../config';

import { User } from '../user/user.entity';
import { UserModel, IUser } from "../user/user.model";


export class AuthModel extends Model {
    userModel: UserModel;
    authModel: Model;
    constructor(params: IModelParams) {
        super(Auth, params);

        this.userModel = new Model(User, {});
        this.authModel = new Model(Auth, {});
    }

    async getUserByTokenId(tokenId: string): Promise<IModelResult<IUser>> {
        const JWT_SECRET: string = process.env.JWT_SECRET || '';
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

    async loginByEmail(email: string, password: string): Promise<IModelResult<string>> {
        const JWT_SECRET: string = process.env.JWT_SECRET || '';
        try {
            const {data} = await this.authModel.findOne({email});
            if(data){
                const athenticated = bcrypt.compareSync(password, data.password);
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

    async signup(email: string, username: string, password: string): Promise<IModelResult<string>> {
        let tokenId = '';
        let error = '';
        const JWT_SECRET: string | undefined = process.env.JWT_SECRET;

        try {
            // const authRepo = this.connection.getRepository(this.entity);
            // const userRepo = this.connection.getRepository(User);

            const {data} = await this.authModel.find({ email });

            if (data && data.length > 0) { // duplicated email
                return { data: null, error: 'The email was already registered.'}
            } else {
                await this.userModel.save({
                    username: username,
                    email: email,
                    balance: 0,
                    createUTC: new Date()
                });

                const {data} = await this.userModel.findOne({ email: email });
                if(data){
                    const hashed = await bcrypt.hash(password, cfg.N_SALT_ROUNDS);
                    const userId: string = data._id; 
                    await this.authModel.save({
                        userId,
                        email: email,
                        password: hashed
                    });
                    tokenId = jwt.sign(userId.toString(), JWT_SECRET || '');
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