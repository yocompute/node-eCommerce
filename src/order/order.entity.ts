import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IBrand } from '../brand/brand.entity';
import { IProduct } from '../product/product.entity';
import { IUser } from '../user/user.entity';
import { IPayment } from '../payment/payment.entity';
import { IQrcode } from '../qrcode/qrcode.entity';

const { Schema } = mongoose;

export interface IOrderItemAddition {
  product: IProduct | string,
  name: string,
  price: number,
  cost: number,
  saleTaxRate: number,
  purchaseTaxRate: number,
  quantity: number
}

export interface IOrderItem {
  product: IProduct | string,
  price: number,
  cost: number,
  saleTaxRate: number,
  purchaseTaxRate: number,
  quantity: number,
  subTotal: number,
  saleTax: number,
  additions: IOrderItemAddition[],
}

export interface IOrder extends Document {
  items: IOrderItem[],
  note: string,
  subTotal: number,
  saleTax: number,
  total: number,
  status: string,
  brand: IBrand | string,
  user: IUser | string,
  qrcode: IQrcode | string,
  payment: IPayment | string,
  createUTC: Date,
  updateUTC?: Date,
}


const OrderItemAdditionSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  cost: Number,
  saleTaxRate: Number,
  purchaseTaxRate: Number,
  quantity: Number
})

const OrderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
  price: Number,
  cost: Number,
  saleTaxRate: Number,
  purchaseTaxRate: Number,
  quantity: Number,
  subTotal: Number,
  saleTax: Number,
  additions: [OrderItemAdditionSchema],
})

const OrderSchema = new Schema({
  items: [OrderItemSchema],
  note: String,
  subTotal: Number,
  saleTax: Number,
  total: Number,
  status: String,
  brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  qrcode: { type: Schema.Types.ObjectId, ref: 'Qrcode' },
  payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
  createUTC: { type: Date, default: new Date() },
  updateUTC: Date,
})

export const Order: MongooseModel<IOrder> = mongoose.model<IOrder>('Order', OrderSchema, 'orders');

