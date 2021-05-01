import {Model as MongooseModel, Document} from 'mongoose';
import mongoose from '../db';
import { IBrand } from '../brand/brand.entity';

const { Schema } = mongoose;

export interface IQrcode extends Document{
    name: string,
    description: string,
    status: string,
    tag: string,
    brand: IBrand | string,
    createUTC: Date,
    updateUTC?: Date,
  }

  
const QrcodeSchema = new Schema({
    // _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    name: String,
    description: String,
    status: String,
    tag: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Qrcode: MongooseModel<IQrcode> = mongoose.model<IQrcode>('Qrcode', QrcodeSchema, 'qrcodes');
