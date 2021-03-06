import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Qrcode } from "./qrcode.entity";
import { IModelResult } from "../model";
import { IBrand } from '../brand/brand.model';

export interface IQrcode {
  name: string,
  description: string,
  status: string,
  brand: IBrand | string,
  createUTC: Date,
  updateUTC: Date,
}

export class QrcodeModel extends Model {
  constructor(params: IModelParams) {
    super(Qrcode, params);
  }


  async find(query: core.Query): Promise<IModelResult<IQrcode[]>> {
    let data: IQrcode[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: IQrcode[] = await this.entityClass.find(query).populate('brand');

      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IQrcode>> {
    let data: IQrcode;
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