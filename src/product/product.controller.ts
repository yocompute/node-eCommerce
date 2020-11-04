
import { Controller } from "../controller";
import { ProductModel } from "./product.model";

export class ProductController extends Controller {
    constructor(model: ProductModel) {
        super(model);
    }
}