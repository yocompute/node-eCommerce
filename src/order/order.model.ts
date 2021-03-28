import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IOrder, Order } from "./order.entity";
import { IModelResult } from "../model";


export class OrderModel extends Model<IOrder> {
  constructor(params: IModelParams) {
    super(Order, params);
  }


  async find(query: core.Query): Promise<IModelResult<IOrder[]>> {
    let data: IOrder[] = [];
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const rs: IOrder[] = await this.model.find(query).populate('user').populate('qrcode').populate('items.product').populate('items.brand');
      data = rs;
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IOrder>> {
    let data: IOrder;
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const r: any = await this.model.findOne(query).populate('user').populate('qrcode').populate('items.product').populate('items.brand');
      data = r._doc; 
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}