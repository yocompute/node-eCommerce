import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IBrand } from '../brand/brand.entity';
import { IProduct } from '../product/product.entity';
import { IUser } from '../user/user.entity';

const { Schema } = mongoose;

export interface IPaymentItem {
    product: IProduct | string,
    brand: IBrand | string,
    quantity: number
  }
  
  export interface IPayment extends Document{
    items: IPaymentItem[],
    note: string,
    total: number,
    cost: number,
    status: string,
    user: IUser | string,
    createUTC: Date,
    updateUTC?: Date,
  }

const PaymentItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    quantity: Number
})

const PaymentSchema = new Schema({
    items: [PaymentItemSchema],
    note: String,
    total: Number,
    cost: Number,
    status: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Payment: MongooseModel<IPayment> = mongoose.model<IPayment>('Payment', PaymentSchema, 'payments');

