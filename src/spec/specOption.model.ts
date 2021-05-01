import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { ISpecOption, SpecOption } from "./specOption.entity";
import { IModelResult} from "../model";

export class SpecOptionModel extends Model<ISpecOption> {
    constructor(params: IModelParams) {
        super(SpecOption, params);
    }


  async find(query: core.Query): Promise<IModelResult<ISpecOption[]>> {
    try {
      if(query){
        query = this.convertIds(query);
      }
      const data: ISpecOption[] = await this.model.find(query).populate('owner').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<ISpecOption>> {
    try {
      if(query){
        query = this.convertIds(query);
      }
      const data: ISpecOption = await this.model.findOne(query).populate('owner').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}