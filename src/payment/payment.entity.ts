import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IBrand } from '../brand/brand.entity';
import { IProduct } from '../product/product.entity';
import { IUser } from '../user/user.entity';
import { IQrcode } from '../qrcode/qrcode.entity';
import { OrderItemSchema, OrderSchema, IOrderItem, IOrder } from '../order/order.entity';

const { Schema } = mongoose;

export interface IPayment extends Document {
  orders: IOrder[],
  note: string,
  subTotal: number,
  saleTax: number,
  total: number,
  status: string,
  user: IUser,
  qrcode: IQrcode,
  createUTC: Date,
  updateUTC?: Date,
}


const PaymentSchema = new Schema({
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  note: String,
  subTotal: Number,
  saleTax: Number,
  total: Number,
  status: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  qrcode: { type: Schema.Types.ObjectId, ref: 'Qrcode' },
  createUTC: { type: Date, default: new Date() },
  updateUTC: Date,
})

export const Payment: MongooseModel<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema, 'payments');

