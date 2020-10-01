import { Product } from "../models/product";
import { Controller, IControllerParams } from "./index";
import { DataBase } from "../dbs";
import { Model } from "../models";

export class ProductController extends Controller {

  constructor(params: IControllerParams) {
    super(new Product(params.db, null), params);
  }
}