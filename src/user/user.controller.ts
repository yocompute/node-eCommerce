
import { Controller } from "../controller";
import { UserModel } from "./user.model";

export class UserController extends Controller {
    constructor(model: UserModel) {
        super(model);
    }
}