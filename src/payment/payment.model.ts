import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IPayment, Payment } from "./payment.entity";
import { IModelResult } from "../model";


export class PaymentModel extends Model<IPayment> {
  constructor(params: IModelParams) {
    super(Payment, params);
  }


  async find(query: core.Query): Promise<IModelResult<IPayment[]>> {
    let data: IPayment[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: IPayment[] = await this.model.find(query).populate('user').populate('items.product').populate('items.brand');
      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IPayment>> {
    let data: IPayment;
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const r: any = await this.model.findOne(query).populate('user').populate('items.product').populate('items.brand');
      data = r._doc; 
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}