import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IPayment, IPaymentItem, Payment } from "./payment.entity";
import { IModelResult } from "../model";
import { IOrder, IOrderItem } from '../order/order.entity';
import { IBrand } from '../brand/brand.entity';
import { OrderModel } from '../order/order.model';


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

  async insertOne(entity: any): Promise<IModelResult<IPayment>> {
    let data: IPayment;
    const orderModel: OrderModel = new OrderModel({});
    try {
      // save payment
      const r: any = await this.model.create(entity);
      data = r._doc;

      const items: IPaymentItem[] = entity.items;
      const brandMap: Map<string | IBrand, IOrderItem[]> = new Map();
      items.forEach(item => brandMap.set(item.brand, []));
      items.forEach(item => {
        const arry: IOrderItem[] = brandMap.get(item.brand)!;
        if(arry){
          const orderItem: any = {...item};
          delete orderItem.brand;
          arry.push(orderItem);
        }
      });
      const brandIds: any[] = [...brandMap.keys()];
      for(let i = 0; i<brandIds.length; i++){
        const brandId = brandIds[i];
        const orderItems: IOrderItem[] = brandMap.get(brandId)!;

        const summary = this.getSummary(orderItems);

        const order: IOrder = {...entity, payment: data._id, brand: brandId, items: orderItems, ...summary,};
        await orderModel.insertOne(order);
      }
      
      return { data, error: '' };
    } catch (error) {
      throw new Error(`Exception: ${error}`);
    }
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