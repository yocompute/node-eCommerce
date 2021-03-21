import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';

const { Schema } = mongoose;

export interface ISpecOption extends Document{
    id: string,
    name: string,
    price: number // only have value in Product
  }

export const SpecOptionSchema = new Schema({
    id: String,
    name: String,
    price: Number // only have value in Product
})

export const SpecOption: MongooseModel<ISpecOption> = mongoose.model<ISpecOption>('SpecOption', SpecOptionSchema, 'spec_options');
