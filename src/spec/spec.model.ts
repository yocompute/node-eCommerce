import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { ISpec, Spec } from "./spec.entity";
import { IModelResult} from "../model";



export class SpecModel extends Model<ISpec> {
    constructor(params: IModelParams) {
        super(Spec, params);
    }


  async find(query: core.Query): Promise<IModelResult<ISpec[]>> {
    try {
      if(query){
        query = this.convertIds(query);
      }
      const data: ISpec[] = await this.model.find(query).populate('brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<ISpec>> {
    try {
      if(query){
        query = this.convertIds(query);
      }
      const data: ISpec = await this.model.findOne(query).populate('brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }


}