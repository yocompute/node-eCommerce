import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { SpecOption } from "./specOption.entity";
import { IModelResult} from "../model";
import { ISpecOption } from './spec.model';

export class SpecOptionModel extends Model {
    constructor(params: IModelParams) {
        super(SpecOption, params);
    }


  async find(query: core.Query): Promise<IModelResult<ISpecOption[]>> {
    let data: ISpecOption[] = [];
    try {
      if(query){
        query = this.convertIds(query);
      }
      const rs: ISpecOption[] = await this.entityClass.find(query).populate('owner');
      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<ISpecOption>> {
    let data: ISpecOption;
    try {
      if(query){
        query = this.convertIds(query);
      }
      const {_doc} = await this.entityClass.findOne(query).populate('owner');
      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}