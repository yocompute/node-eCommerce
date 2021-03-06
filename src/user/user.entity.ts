import mongoose from '../db';

const { Schema } = mongoose;

const UserSchema = new Schema({
    username: String,
    email: String,
    phone: String,
    balance: { Number, default: 0},
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const User = mongoose.model('User', UserSchema, 'users');

