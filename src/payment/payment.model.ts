import * as core from 'express-serve-static-core';
import { IModelParams, Model } from "../model";
import { IPayment, IPaymentItem, Payment } from "./payment.entity";
import { IModelResult } from "../model";
import { IOrder, IOrderItem } from '../order/order.entity';
import { IBrand } from '../brand/brand.entity';
import { OrderModel } from '../order/order.model';
import { ProductModel } from '../product/product.model';
import { IProduct } from '../product/product.entity';


export class PaymentModel extends Model<IPayment> {
  constructor(params: IModelParams) {
    super(Payment, params);
  }
  
  getTotal(items: any[], products: any[]){
    let total = 0;
    let cost = 0;
    
    items.forEach((item: any) => {
      const r = products.find(p => p._doc._id.toString() === item.product);
      if(r._doc){
        const p = r._doc;
        total += p.price * item.quantity * (100 + p.saleTaxRate) / 100;
        cost += p.cost * item.quantity;
      }
    });
    return {total, cost};
  }

  async insertOne(entity: any): Promise<IModelResult<IPayment>> {
    let data: IPayment;
    const orderModel: OrderModel = new OrderModel({});
    const productModel: ProductModel = new ProductModel({});
    try {
      // save payment
      const r: any = await this.model.create(entity);
      data = r._doc;

      const ps: IModelResult<IProduct[]> = await productModel.find({})!;
      const items: IPaymentItem[] = entity.items;
      const brandMap: Map<string | IBrand, IOrderItem[]> = new Map();
      items.forEach(item => brandMap.set(item.brand, []));
      items.forEach(item => {
        const arry: IOrderItem[] = brandMap.get(item.brand)!;
        if(arry){
          arry.push({product: item.product, quantity: item.quantity});
        }
      });
      const brandIds: any[] = [...brandMap.keys()];
      for(let i = 0; i<brandIds.length; i++){
        const brandId = brandIds[i];
        const orderItems: IOrderItem[] = brandMap.get(brandId)!;

        const {total, cost} = this.getTotal(orderItems, ps.data!);
        const order: IOrder = {...entity, payment: data._id, total, cost, brand: brandId, items: orderItems};
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