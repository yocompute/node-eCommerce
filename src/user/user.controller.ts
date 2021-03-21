
import { Controller } from "../controller";
import { IUser } from "./user.entity";
import { UserModel } from "./user.model";

export class UserController extends Controller<IUser> {
    constructor(modelClass: UserModel) {
        super(modelClass);
    }
}