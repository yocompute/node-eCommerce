import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IQrcode, Qrcode } from "./qrcode.entity";
import { IModelResult } from "../model";


export class QrcodeModel extends Model<IQrcode> {
  constructor(params: IModelParams) {
    super(Qrcode, params);
  }


  async find(query: core.Query): Promise<IModelResult<IQrcode[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IQrcode[] = await this.model.find(query).populate('brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IQrcode>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IQrcode = await this.model.findOne(query).populate('brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}