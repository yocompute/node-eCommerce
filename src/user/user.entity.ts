import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';

const { Schema } = mongoose;

export interface IUser extends Document{
    username: string,
    email: string,
    phone?: string,
    balance: number,
    createUTC: Date,
    updateUTC?: Date,
}

const UserSchema = new Schema({
    username: String,
    email: String,
    phone: String,
    balance: { Number, default: 0},
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const User: MongooseModel<IUser> = mongoose.model<IUser>('User', UserSchema, 'users');

