// import { Model as MongooseModel, Document } from 'mongoose';
// import mongoose from '../db';
// import { IUser } from '../user/user.entity';
// import { IPayment } from '../payment/payment.entity';

// const { Schema } = mongoose;

// export interface IPayout extends Document {
//   to: IUser,
//   by: IUser,
//   status: string,
//   amount: number,
//   description: string,
//   note: string,
//   createUTC: Date,
//   updateUTC?: Date,
// }

// const PayoutSchema = new Schema({
//     to: { type: Schema.Types.ObjectId, ref: 'User' },
//     by: { type: Schema.Types.ObjectId, ref: 'User' },
//     status: String,
//     amount: Number,
//     description: String,
//     note: String,
//     createUTC: { type: Date, default: new Date() },
//     updateUTC: Date,
// })

// export const Payout: MongooseModel<IPayout> = mongoose.model<IPayout>('Payout', PayoutSchema, 'payouts');

