
import { Controller } from "../controller";
import { BrandModel } from "./brand.model";

export class BrandController extends Controller {
    constructor(model: BrandModel) {
        super(model);
    }
}