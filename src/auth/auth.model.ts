import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Code } from "../controller";
import { IModelParams, IModelResult, Model } from "../model";
import { Auth } from "./auth.entity";
import { User } from "../user/user.entity";
import { cfg } from '../config';



export class AuthModel extends Model {
    constructor(params: IModelParams) {
        super(Auth, params);
    }

    async login(credential: any): Promise<IModelResult> {
        let data: any = [];
        let code = Code.FAIL;
        let tokenId = null;
        let error = '';
        const JWT_SECRET: any = process.env.JWT_SECRET;
        const email = credential.email;
        try {

            const repo = this.connection.getRepository(this.entity);
            const r: any = await repo.findOne({email});
            if(r){
                const athenticated = bcrypt.compareSync(credential.password, r.password);
                if(athenticated){
                    tokenId = jwt.sign(r._id.toString(), JWT_SECRET);
                }else{
                    error = 'Authentication fail';
                }
            }

            code = Code.SUCCESS;
            data = r;
            return { code, data: tokenId, error };
        } catch (error) {
            return { code, data: tokenId, error };
        }
    }

    async signup(d: any): Promise<IModelResult> {
        let data: any = null;
        let code = Code.FAIL;
        let tokenId = '';
        let error = '';
        const JWT_SECRET: any = process.env.JWT_SECRET;
        const email = d.email;

        try {
            const authRepo = this.connection.getRepository(this.entity);
            const userRepo = this.connection.getRepository(User);

            const rs = await authRepo.find({ email });

            if (rs && rs.length > 0) {
                // pass
            } else {
                await userRepo.save({
                    username: d.username,
                    email: d.email,
                    balance: 0,
                    createUTC: new Date()
                });

                const user = await userRepo.findOne({ email: d.email });
                if(user){
                    const password = await bcrypt.hash(d.password, cfg.N_SALT_ROUNDS);
                    const userId: any = user?._id; 
                    await authRepo.save({
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