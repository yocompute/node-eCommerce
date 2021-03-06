
import { IModelParams, Model } from "../model";
import { User } from "./user.entity";

export interface IUser {
    _id: string,
    username: string,
    email: string,
    phone: string,
    balance: number,
    createUTC: Date,
    updateUTC: Date,
}

export class UserModel extends Model {
    constructor(params: IModelParams) {
        super(User, params);
    }
}