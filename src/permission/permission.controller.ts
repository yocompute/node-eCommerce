
import { Controller } from "../controller";
import { IPermission } from "./permission.entity";
import { PermissionModel } from "./permission.model";

export class PermissionController extends Controller<IPermission> {
    constructor(modelClass: PermissionModel) {
        super(modelClass);
    }
}