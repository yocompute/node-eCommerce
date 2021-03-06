import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { Payment } from "./payment.entity";
import { IModelResult } from "../model";
import { IUser } from '../user/user.model';
import { IProduct } from '../product/product.model';
import { IBrand } from '../brand/brand.model';

export interface IPaymentItem {
  product: IProduct | string,
  brand: IBrand | string,
  quantity: number
}

export interface IPayment {
  items: IPaymentItem[],
  note: string,
  total: number,
  cost: number,
  status: string,
  user: IUser | string,
  createUTC: Date,
  updateUTC: Date,
}

export class PaymentModel extends Model {
  constructor(params: IModelParams) {
    super(Payment, params);
  }


  async find(query: core.Query): Promise<IModelResult<IPayment[]>> {
    let data: IPayment[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: IPayment[] = await this.entityClass.find(query).populate('user').populate('items.product').populate('items.brand');
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
      const { _doc } = await this.entityClass.findOne(query).populate('user').populate('items.product').populate('items.brand');
      data = _doc;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}