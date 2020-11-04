
import { IModelParams, Model } from "../model";
import { Product } from "./product.entity";

export class ProductModel extends Model {
    constructor(params: IModelParams) {
        super(Product, params);
    }
}