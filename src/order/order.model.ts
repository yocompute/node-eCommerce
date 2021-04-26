import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IOrder, Order } from "./order.entity";
import { IModelResult } from "../model";
import { TransactionModel } from "../transaction/transaction.model";
import { SYSTEM_ID } from "../const";

export class OrderModel extends Model<IOrder> {
  constructor(params: IModelParams) {
    super(Order, params);
  }

  async insertOne(entity: any): Promise<IModelResult<IOrder>> {
    const trModel: TransactionModel = new TransactionModel({});
    try {
      const r: any = await this.model.create(entity);
      const data: IOrder = r._doc;

      // insert transactions
      const r1 = await this.findOne({_id: r._id});
      const order: any = r1.data;
      const ownerId = order.brand.owner;
      const tr = {from: ownerId, to: entity.user, by: SYSTEM_ID, amount: entity.total, note: 'Place Order' };
      await trModel.insertOne(tr);
      
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async find(query: core.Query): Promise<IModelResult<IOrder[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IOrder[] = await this.model.find(query).populate('user').populate('brand').populate('qrcode')
        .populate('items.product').populate('items.brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IOrder>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IOrder = await this.model.findOne(query).populate('user').populate('brand').populate('qrcode')
        .populate('items.product').populate('items.brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}