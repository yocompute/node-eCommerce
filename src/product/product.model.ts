
import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IProduct, Product } from "./product.entity";
import { IModelResult } from "../model";



export class ProductModel extends Model<IProduct> {
  constructor(params: IModelParams) {
    super(Product, params);
  }

  async find(query: core.Query): Promise<IModelResult<IProduct[]>> {
    let data: IProduct[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: IProduct[] = await this.model.find(query).populate('brand').populate('category').populate('specs').populate('additions');

      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IProduct>> {
    let data: IProduct;
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const r: any = await this.model.findOne(query).populate('brand').populate('category').populate('specs').populate('additions');
      data = r._doc; 
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
