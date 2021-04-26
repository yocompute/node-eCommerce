import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Category, ICategory } from "./category.entity";
import { IModelResult } from "../model";



export class CategoryModel extends Model<ICategory> {
  constructor(params: IModelParams) {
    super(Category, params);
  }


  async find(query: core.Query): Promise<IModelResult<ICategory[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: ICategory[] = await this.model.find(query).populate('brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<ICategory>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: ICategory = await this.model.findOne(query).populate('brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}