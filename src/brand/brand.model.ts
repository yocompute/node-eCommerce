
import { IModelParams, Model } from "../model";
import { Brand } from "./brand.entity";

export class BrandModel extends Model {
    constructor(params: IModelParams) {
        super(Brand, params);
    }
}