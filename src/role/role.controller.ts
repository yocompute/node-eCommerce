import { Controller } from "../controller";
import { IRole } from "./role.entity";
import { RoleModel } from "./role.model";

export class RoleController extends Controller<IRole> {
    constructor(modelClass: RoleModel) {
        super(modelClass);
    }
}