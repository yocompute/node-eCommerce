
import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Product } from "./product.entity";
import { IModelResult } from "../model";
import { IPicture } from '../uploader/uploader.model';
import { ISpec } from '../spec/spec.model';
import { ICategory } from '../category/category.model';
import { IBrand } from '../brand/brand.model';

export interface IAddition{
  type: string
}

export interface IProduct{
  // _id: {type: Types.ObjectId, default: new Types.ObjectId()},
  name: string,
  description: string,
  price: number,
  saleTaxRate: number,
  cost: number,
  purchaseTaxRate: number,
  pictures: IPicture[],
  specs: ISpec[],
  type: string, // S: single, C: combo, A: addition
  additions: IAddition[],// addition product id array
  status: string,
  brand: IBrand | string,
  category: ICategory | string,
  createUTC: Date,
  updateUTC: Date,
}

export class ProductModel extends Model {
  constructor(params: IModelParams) {
    super(Product, params);
  }

  async find(query: core.Query): Promise<IModelResult<IProduct[]>> {
    let data: IProduct[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: IProduct[] = await this.entityClass.find(query).populate('brand').populate('category').populate('specs').populate('additions');

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
      const { _doc } = await this.entityClass.findOne(query).populate('brand').populate('category').populate('specs').populate('additions');
      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}
