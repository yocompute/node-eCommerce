import * as core from 'express-serve-static-core';
import { IModelResult, IModelParams, Model } from "../model";
import { IPayment, Payment } from "./payment.entity";
import { IOrder, IOrderItem } from '../order/order.entity';
import { OrderModel } from '../order/order.model';
import { TransactionModel } from '../transaction/transaction.model';
import { PaymentStatus, SYSTEM_ID, TransactionType } from '../const';


export class PaymentModel extends Model<IPayment> {
  constructor(params: IModelParams) {
    super(Payment, params);
  }
  
  getOrderSummary(items: IOrderItem[]){
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

  getSummary(orders: IOrder[]){
    let subTotal = 0;
    let saleTax = 0;
    let total = 0;
    
    orders.forEach((order: IOrder) => {
      const r = this.getOrderSummary(order.items);
      subTotal += r.subTotal;
      saleTax += r.saleTax;
    });

    subTotal = Math.round(subTotal * 100) / 100;
    saleTax = Math.round(saleTax * 100) / 100;
    total = Math.round((subTotal + saleTax) * 100) / 100;
    return {subTotal, saleTax, total};
  }
  /**
   * Split payment into orders by brand
   * payment ---- raw db object without populated fields
   */
  // groupOrdersByBrand(payment: IPayment): IOrder[] {
  //   const items: IOrderItem[] = payment.items;
  //   const brandMap: Map<string, IOrderItem[]> = new Map();
  //   const orders: IOrder[] = [];
    
  //   items.forEach(item => brandMap.set(item.brand.toString(), []));
  //   items.forEach(item => {
  //     const arry: IOrderItem[] = brandMap.get(item.brand.toString())!;
  //     if(arry){
  //       arry.push(item);
  //     }
  //   });
    
  //   const brandIds: string[] = [...brandMap.keys()];
  //   for(let i = 0; i<brandIds.length; i++){
  //     const brandId = brandIds[i];
  //     const orderItems: IOrderItem[] = brandMap.get(brandId)!;

  //     const summary = this.getSummary(orderItems);
  //     const data = { ...payment };
  //     delete data._id;
  //     const order: any = {...data, payment: payment._id, brand: brandId, items: orderItems, ...summary};
  //     orders.push(order);
  //   }
  //   return orders;
  // }

  async insertOne(entity: any): Promise<IModelResult<IPayment>> {
    const orderModel: OrderModel = new OrderModel({});
    try {
      const d: any = { ...entity, orders: [] };
      const r: any = await this.model.create(d);
      const paymentId = r._doc._id.toString();


      const orders = entity.orders.map((order: any) => {
        return {
          ...order,
          payment:paymentId
        }
      });

      const orderIds = [];
      for(let i = 0; i<orders.length; i++){
        const ro: IModelResult<IOrder> = await orderModel.insertOne(orders[i]);
        const order = ro.data!;
        orderIds.push(order._id);
      }

      // await this.model.updateOne({_id: paymentId}, { orders: orderIds });
      const data: IPayment = await this.model.findOne({_id: r._id}).lean();

      // const orders = this.groupOrdersByBrand(data);
      
      // for(let i = 0; i<orders.length; i++){
      //   await orderModel.insertOne(orders[i]);
      // }
      
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }

  async updateOne(query: any, updates: any): Promise<IModelResult<IPayment>> {
    // const orderModel: OrderModel = new OrderModel({});
    // const trModel: TransactionModel = new TransactionModel({});
    try {
      const oldPayment: IPayment = await this.model.findOne(query).lean();
      delete updates._id;
      await this.model.updateOne(query, updates);

      const payment: IPayment = await this.model.findOne(query).lean();
      // const orderUpdates: IOrder[] = this.getOrders(payment);
      
      // const ret = await orderModel.findRaw({payment: payment._id});
      // const orders = ret.data;

      // if(orders){
      //   for(let i = 0; i<orders.length; i++){
      //     const order: IOrder = orders[i];
      //     const data = orderUpdates.find(it => it.brand.toString() === order.brand.toString());
      //     await orderModel.updateOne({_id: order._id}, data);
      //   }
      // }
      
      // // insert transaction
      // if(oldPayment.status === PaymentStatus.New && payment.status === PaymentStatus.Paid){
      //   // insert transactions
      //   const tr = {from: payment.user._id, to: SYSTEM_ID, by: SYSTEM_ID, amount: payment.total, type: TransactionType.ClientPay, note: 'Client Pay' };
      //   await trModel.insertOne(tr);
      // }
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
      const data: IPayment[] = await this.model.find(query).populate('user').populate('qrcode')
        .populate({path: 'orders', populate: {path: 'items.product'}})
        .populate({path: 'orders', populate: {path: 'items.additions', populate: {path:'product'}}})
        .lean();
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
      const data: IPayment = await this.model.findOne(query).populate('user').populate('qrcode')
      .populate({path: 'orders', populate: {path: 'items.product'}})
      .populate({path: 'orders', populate: {path: 'items.additions', populate: {path:'product'}}})
      .lean();
      return { data, error: '' };
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  
  async excludeDeletedItems(originalItems: IOrderItem[], deletedItems: IOrderItem[]){
    const items: IOrderItem[] = [];
    originalItems.forEach((it: IOrderItem) => {
      const orderItem = deletedItems.find(item => item._id.toString() === it._id.toString());
      if(!orderItem){
        items.push(it);
      }
    });
    const summary = this.getOrderSummary(items);
    return {items, summary};
  }

  async deleteOne(query: core.Query): Promise<IModelResult<IPayment>> {
    try {
      const data: IPayment = await this.model.findOne(query).lean();

      if(data.status === PaymentStatus.New){
        const updates: any = { status: PaymentStatus.Cancelled, updateUTC: new Date() };
        await this.model.updateOne(query, updates);
        return { data, error: '' };
      }else{
        return {data, error: 'Can not cancel the payment'}
      }
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
  }
}