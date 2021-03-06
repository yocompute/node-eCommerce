import { Model as MongooseModel, Document } from 'mongoose';
import { IBrand } from '../brand/brand.entity';
import mongoose from '../db';
import { ISpecOption, SpecOptionSchema } from './specOption.entity';

const { Schema } = mongoose;



export interface ISpec extends Document {
    _id: string,
    name: string,
    description: string,
    options: ISpecOption[],
    status: string,
    brand: IBrand | string,
    createUTC: Date,
    updateUTC?: Date,
}

export const SpecSchema = new Schema({
    name: String,
    description: String,
    options: [SpecOptionSchema],
    status: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    createUTC: { type: Date, default: new Date() },
    updateUTC: Date,
})

export const Spec: MongooseModel<ISpec> = mongoose.model<ISpec>('Spec', SpecSchema, 'specs');
