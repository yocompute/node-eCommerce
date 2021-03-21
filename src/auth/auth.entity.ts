import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IUser } from '../user/user.entity';

const { Schema, Types } = mongoose;

export interface IAuth extends Document{
    email: string,
    password: string,
    phone: string,
    user: IUser | string,
    creatUTC: Date,
}

const AuthSchema = new Schema({
    _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    email: String,
    password: String,
    phone: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    creatUTC: Date,
})

export const Auth: MongooseModel<IAuth> = mongoose.model<IAuth>('Auth', AuthSchema, 'auth');
