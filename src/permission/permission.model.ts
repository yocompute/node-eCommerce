
import { IModelParams, Model } from "../model";
import { IPermission, Permission } from "./permission.entity";



export class PermissionModel extends Model<IPermission> {
    constructor(params: IModelParams) {
        super(Permission, params);
    }
}