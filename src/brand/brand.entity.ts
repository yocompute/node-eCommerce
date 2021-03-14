import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { PictureSchema } from '../picture/picture.entity';
import { IPicture } from '../uploader/uploader.model';
import { IUser } from '../user/user.entity';

const { Schema } = mongoose;

export interface IBrand extends Document{
    name: string,
    description: string,
    pictures: IPicture[],
    status: string,
    owner: IUser | string,
    deliverMethods: string[],
    maxDeliverDistance: number,
    minConsumption: number,
    createUTC: Date,
    updateUTC?: Date,
  }

const BrandSchema = new Schema({
    name: String,
    description: String,
    pictures: [PictureSchema],
    status: String,
    deliverMethods: [String],
    maxDeliverDistance: Number,
    minConsumption: Number,
    owner: { type: Schema.Types.ObjectId, ref: 'User' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Brand: MongooseModel<IBrand> = mongoose.model<IBrand>('Brand', BrandSchema, 'brands');

