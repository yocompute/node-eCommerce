import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IOrder, Order } from "./order.entity";
import { IPayment } from "../payment/payment.entity";
import { IModelResult } from "../model";
import { PaymentModel } from '../payment/payment.model';
import { TransactionModel } from "../transaction/transaction.model";
import { SYSTEM_ID, TransactionType, OrderStatus } from "../const";

export class OrderModel extends Model<IOrder> {
  constructor(params: IModelParams) {
    super(Order, params);
  }

  async insertOne(entity: IOrder): Promise<IModelResult<IOrder>> {
    const trModel: TransactionModel = new TransactionModel({});
    const paymentModel: PaymentModel = new PaymentModel({});
    try {
      const r: any = await this.model.create(entity);
      const data: IOrder = r._doc;

      const paymentId = data.payment.toString();
      const p: IModelResult<IPayment> = await paymentModel.findOne({_id: paymentId});
      const payment: IPayment = p.data!;

      const orders = [...payment.orders, data];
      const summary = paymentModel.getSummary(orders);

      await paymentModel.updateOne({_id: paymentId}, {...summary, orders: orders.map(it => it._id)});
      // // insert transactions
      // const r1 = await this.findOne({_id: r._id});
      // const order: any = r1.data;
      // const ownerId = order.brand.owner;
      // const tr = {from: ownerId, to: entity.user, by: SYSTEM_ID, amount: entity.total, type: TransactionType.ClientPlaceOrder, note: 'Place Order' };
      // await trModel.insertOne(tr);
      
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async findRaw(query: core.Query): Promise<IModelResult<IOrder[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IOrder[] = await this.model.find(query).lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
  
  async findOneRaw(query: core.Query): Promise<IModelResult<IOrder>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IOrder = await this.model.findOne(query).lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async find(query: core.Query): Promise<IModelResult<IOrder[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IOrder[] = await this.model.find(query).populate('user').populate('brand').populate('qrcode')
        .populate({path: 'items.product'}).populate('items.brand').populate({path:'items', populate:{path: 'additions.product'}}).lean();
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
        .populate({path:'items.product'}).populate('items.brand').populate({path:'items', populate:{path: 'additions.product'}}).lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async deleteOne(query: core.Query): Promise<IModelResult<IOrder>> {
    try {
      const data: IOrder = await this.model.findOne(query).lean();

      if(data.status === OrderStatus.New){
        const updates: any = { status: OrderStatus.Cancelled, updateUTC: new Date() };
        await this.model.updateOne(query, updates);

        // const paymentModel: PaymentModel = new PaymentModel({});
        // const r: IModelResult<IPayment> = await paymentModel.findOneRaw({_id: data.payment.toString()});
        // const payment: IPayment = r.data!;
        // const paymentUpdates: any = await paymentModel.excludeDeletedItems(payment.items, data.items);
        // if(paymentUpdates.items && paymentUpdates.items.length > 0){
        //   await paymentModel.updateOne({_id: data.payment.toString()}, paymentUpdates);
        // }else{
        //   await paymentModel.deleteOne({_id: data.payment.toString()});
        // }
        return { data, error: '' };
      }else{
        return {data, error: 'Can not cancel the order'}
      }
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}