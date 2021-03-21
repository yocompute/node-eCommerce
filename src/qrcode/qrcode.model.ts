import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IQrcode, Qrcode } from "./qrcode.entity";
import { IModelResult } from "../model";


export class QrcodeModel extends Model<IQrcode> {
  constructor(params: IModelParams) {
    super(Qrcode, params);
  }


  async find(query: core.Query): Promise<IModelResult<IQrcode[]>> {
    let data: IQrcode[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: IQrcode[] = await this.model.find(query).populate('brand');

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
      const r: any = await this.model.findOne(query).populate('brand');
      data = r._doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}