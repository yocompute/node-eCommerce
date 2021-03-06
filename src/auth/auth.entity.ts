import mongoose from '../db';

const { Schema, Types } = mongoose;

const AuthSchema = new Schema({
    _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    email: String,
    password: String,
    phone: String,
    userId: Types.ObjectId,
    creatUTC: Date,
})

export const Auth = mongoose.model('Auth', AuthSchema, 'auth');
