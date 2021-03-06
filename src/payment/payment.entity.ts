import mongoose from '../db';

const { Schema } = mongoose;

const PaymentItemSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    quantity: Number
})

const PaymentSchema = new Schema({
    items: [PaymentItemSchema],
    note: String,
    total: Number,
    cost: Number,
    status: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Payment = mongoose.model('Payment', PaymentSchema, 'payments');

