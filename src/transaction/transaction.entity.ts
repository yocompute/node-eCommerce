import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IUser } from '../user/user.entity';
import { IPayment } from '../payment/payment.entity';

const { Schema } = mongoose;

export interface ITransaction extends Document {
  from: IUser | string,
  to: IUser | string,
  by: IUser | string,
  payment: IPayment | string,
  type: String,
  amount: number,
  note: string,
  createUTC: Date,
  updateUTC?: Date,
}


const TransactionSchema = new Schema({
    from: { type: Schema.Types.ObjectId, ref: 'User' },
    to: { type: Schema.Types.ObjectId, ref: 'User' },
    by: { type: Schema.Types.ObjectId, ref: 'User' },
    payment: { type: Schema.Types.ObjectId, ref: 'Payment' },
    type: String,
    amount: Number,
    note: String,
    createUTC: { type: Date, default: new Date() },
    updateUTC: Date,
})

export const Transaction: MongooseModel<ITransaction> = mongoose.model<ITransaction>('Transaction', TransactionSchema, 'transactions');

