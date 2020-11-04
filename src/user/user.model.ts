
import { IModelParams, Model } from "../model";
import { User } from "./user.entity";

export class UserModel extends Model {
    constructor(params: IModelParams) {
        super(User, params);
    }
}