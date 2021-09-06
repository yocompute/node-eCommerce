import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';

const { Schema } = mongoose;

export interface IBusinessHour{
  opening: boolean,
  start: string,
  end: string,
}

export interface IQuote extends Document{
    _id: string,
    username: string,
    company: string,
    email: string,
    description: string,
    createUTC: Date,
    updateUTC?: Date,
  }


const QuoteSchema = new Schema({
    username: String,
    company: String,
    email: String,
    description: String,
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Quote: MongooseModel<IQuote> = mongoose.model<IQuote>('Quote', QuoteSchema, 'quotes');

