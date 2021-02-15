import mongoose from '../db';

const { Schema, Types } = mongoose;
const ObjectId = Types.ObjectId;

const AuthSchema = new Schema({
    _id: {type: ObjectId, default: new ObjectId()},
    email: String,
    password: String,
    phone: String,
    userId: ObjectId,
    creatUTC: Date,
})

export const Auth = mongoose.model('Auth', AuthSchema, 'auth');
