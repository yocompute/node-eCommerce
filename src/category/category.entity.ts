import { Model as MongooseModel, Document } from 'mongoose';
import { IBrand } from '../brand/brand.entity';
import mongoose from '../db';

const { Schema } = mongoose;

export interface ICategory extends Document{
    name: string,
    description: string,
    imageUrl: string,
    status: string,
    brand: IBrand | string,
    createUTC: Date,
    updateUTC?: Date,
  }

const CategorySchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    status: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Category: MongooseModel<ICategory> = mongoose.model<ICategory>('Category', CategorySchema, 'categories');

