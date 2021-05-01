import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IPayment, IPaymentItem, Payment } from "./payment.entity";
import { IModelResult } from "../model";
import { IOrder, IOrderItem } from '../order/order.entity';
import { OrderModel } from '../order/order.model';
import { PaymentStatus, SYSTEM_ID, TransactionType } from '../const';
import { TransactionModel } from '../transaction/transaction.model';


export class PaymentModel extends Model<IPayment> {
  constructor(params: IModelParams) {
    super(Payment, params);
  }
  
  getSummary(items: IOrderItem[]){
    let subTotal = 0;
    let saleTax = 0;
    let total = 0;
    
    items.forEach((it: IOrderItem) => {
      subTotal += it.subTotal;
      saleTax += it.saleTax;
    });
    subTotal = Math.round(subTotal * 100) / 100;
    saleTax = Math.round(saleTax * 100) / 100;
    total = Math.round((subTotal + saleTax) * 100) / 100;
    return {subTotal, saleTax, total};
  }

  /**
   * Split payment into orders by brand
   * payment ---- object with _id
   */
  getOrders(payment: IPayment): IOrder[] {
    const items: IPaymentItem[] = payment.items;
    const brandMap: Map<string, IOrderItem[]> = new Map();
    const orders: IOrder[] = [];
    
    items.forEach(item => brandMap.set(item.brand.toString(), []));
    items.forEach(item => {
      const arry: IOrderItem[] = brandMap.get(item.brand.toString())!;
      if(arry){
        const orderItem: any = {...item};
        delete orderItem._id;
        delete orderItem.brand;
        arry.push(orderItem);
      }
    });
    
    const brandIds: string[] = [...brandMap.keys()];
    for(let i = 0; i<brandIds.length; i++){
      const brandId = brandIds[i];
      const orderItems: IOrderItem[] = brandMap.get(brandId)!;

      const summary = this.getSummary(orderItems);
      const data = { ...payment };
      delete data._id;
      const order: any = {...data, payment: payment._id, brand: brandId, items: orderItems, ...summary};
      orders.push(order);
    }
    return orders;
  }

  

  async insertOne(entity: any): Promise<IModelResult<IPayment>> {
    const orderModel: OrderModel = new OrderModel({});
    try {
      // save payment
      const r: any = await this.model.create(entity);
      const r1: IModelResult<IPayment> = await this.findOneRaw({_id: r._id});
      const data: any = r1.data;

      const orders = this.getOrders(data);
      
      for(let i = 0; i<orders.length; i++){
        await orderModel.insertOne(orders[i]);
      }
      
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }


  async updateOne(query: any, updates: any): Promise<IModelResult<IPayment>> {
    const orderModel: OrderModel = new OrderModel({});
    const trModel: TransactionModel = new TransactionModel({});
    try {
      const r1: any  = await this.model.findOne(query);
      const oldPayment: IPayment = r1._doc;

      // update payment
      delete updates._id;
      await this.model.updateOne(query, updates);
      const r: IModelResult<IPayment> = await this.findOneRaw(query);
      const payment: IPayment = r.data!;
      const orderUpdates: IOrder[] = this.getOrders(payment);
      
      const ret = await orderModel.findRaw({payment: payment._id});
      const orders = ret.data;

      if(orders){
        for(let i = 0; i<orders.length; i++){
          const order: IOrder = orders[i];
          const data = orderUpdates.find(it => it.brand.toString() === order.brand.toString());
          await orderModel.updateOne({_id: order._id}, data);
        }
      }
      
      // insert transaction
      if(oldPayment.status === PaymentStatus.NEW && payment.status === PaymentStatus.PAID){
        // insert transactions
        const tr = {from: payment.user._id, to: SYSTEM_ID, by: SYSTEM_ID, amount: payment.total, type: TransactionType.ClientPay, note: 'Client Pay' };
        await trModel.insertOne(tr);
      }
      return { data: payment, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async findOneRaw(query: core.Query): Promise<IModelResult<IPayment>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IPayment = await this.model.findOne(query).lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async find(query: core.Query): Promise<IModelResult<IPayment[]>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IPayment[] = await this.model.find(query).populate('user').populate('qrcode').
        populate('items.product').populate('items.brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findOne(query: core.Query): Promise<IModelResult<IPayment>> {
    try {
      if (query) {
        query = this.convertIds(query);
      }
      const data: IPayment = await this.model.findOne(query).populate('user').populate('qrcode').
        populate('items.product').populate('items.brand').lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }
}