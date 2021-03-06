import mongoose from '../db';

const { Schema } = mongoose;

export const SpecOptionSchema = new Schema({
    id: String,
    name: String,
    price: Number // only have value in Product
})

export const SpecOption = mongoose.model('SpecOption', SpecOptionSchema, 'spec_options');
