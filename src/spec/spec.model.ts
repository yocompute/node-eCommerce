import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Spec } from "./spec.entity";
import { IModelResult} from "../model";
import { IBrand } from '../brand/brand.model';


export interface ISpecOption{
  id: string,
  name: string,
  price: number // only have value in Product
}

export interface ISpec{
  name: string,
  description: string,
  options: ISpecOption[],
  status: string,
  brand: IBrand | string,
  createUTC: Date,
  updateUTC: Date,
}

export class SpecModel extends Model {
    constructor(params: IModelParams) {
        super(Spec, params);
    }


  async find(query: core.Query): Promise<IModelResult<ISpec[]>> {
    let data: ISpec[] = [];
    try {
      if(query){
        query = this.convertIds(query);
      }
      const rs: ISpec[] = await this.entityClass.find(query).populate('brand');
      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<ISpec>> {
    let data: ISpec;
    try {
      if(query){
        query = this.convertIds(query);
      }
      const {_doc} = await this.entityClass.findOne(query).populate('brand');

      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }


}