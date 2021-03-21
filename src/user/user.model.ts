
import { IModelParams, Model } from "../model";
import { IUser, User } from "./user.entity";



export class UserModel extends Model<IUser> {
    constructor(params: IModelParams) {
        super(User, params);
    }
}