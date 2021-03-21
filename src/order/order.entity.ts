import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IBrand } from '../brand/brand.entity';
import { IProduct } from '../product/product.entity';
import { IUser } from '../user/user.entity';
import { IPayment } from '../payment/payment.entity';

const { Schema } = mongoose;

export interface IOrderItem {
    product: IProduct | string,
    quantity: number
  }
  
  export interface IOrder extends Document{
    items: IOrderItem[],
    note: string,
    total: number,
    cost: number,
    status: string,
    brand: IBrand | string,
    user: IUser | string,
    payment: IPayment | string,
    createUTC: Date,
    updateUTC?: Date,
  }

const OrderItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    quantity: Number
})

const OrderSchema = new Schema({
    items: [OrderItemSchema],
    note: String,
    total: Number,
    cost: Number,
    status: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Order: MongooseModel<IOrder> = mongoose.model<IOrder>('Order', OrderSchema, 'orders');

