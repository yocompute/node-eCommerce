import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IBrand } from '../brand/brand.entity';
import { IProduct } from '../product/product.entity';
import { IUser } from '../user/user.entity';
import { IQrcode } from '../qrcode/qrcode.entity';
import { OrderItemSchema, IOrderItem } from '../order/order.entity';

const { Schema } = mongoose;

export interface IPayment extends Document {
  items: IOrderItem[],
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
  items: [OrderItemSchema],
  note: String,
  sutTotal: Number,
  saleTax: Number,
  total: Number,
  status: String,
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  qrcode: { type: Schema.Types.ObjectId, ref: 'Qrcode' },
  createUTC: { type: Date, default: new Date() },
  updateUTC: Date,
})

export const Payment: MongooseModel<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema, 'payments');

