
import { IModelParams, Model } from "../model";
import { IRole, Role } from "./role.entity";



export class RoleModel extends Model<IRole> {
    constructor(params: IModelParams) {
        super(Role, params);
    }
}