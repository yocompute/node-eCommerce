import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Category } from "./category.entity";
import { IModelResult } from "../model";
import { IBrand } from '../brand/brand.model';

export interface ICategory {
  name: string,
  description: string,
  imageUrl: string,
  status: string,
  brand: IBrand | string,
  createUTC: Date,
  updateUTC: Date,
}

export class CategoryModel extends Model {
  constructor(params: IModelParams) {
    super(Category, params);
  }


  async find(query: core.Query): Promise<IModelResult<ICategory[]>> {
    let data: ICategory[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: ICategory[] = await this.entityClass.find(query).populate('brand');
      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<ICategory>> {
    let data: ICategory;
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const { _doc } = await this.entityClass.findOne(query).populate('brand');
      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}