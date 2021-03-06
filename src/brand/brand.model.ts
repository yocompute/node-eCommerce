import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Brand } from "./brand.entity";
import { IModelResult } from "../model";
import { IPicture } from "../uploader/uploader.model";
import { IUser } from '../user/user.model';

export interface IBrand {
  name: string,
  description: string,
  pictures: IPicture[],
  status: string,
  owner: IUser | string,
  createUTC: Date,
  updateUTC: Date,
}

export class BrandModel extends Model {
  constructor(params: IModelParams) {
    super(Brand, params);
  }


  async find(query: core.Query): Promise<IModelResult<IBrand[]>> {
    let data: IBrand[] = [];

    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: IBrand[] = await this.entityClass.find(query).populate('owner');

      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IBrand>> {
    let data: IBrand;

    try {
      if (query) {
        query = this.convertIds(query);
      }
      const { _doc } = await this.entityClass.findOne(query).populate('owner');

      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}