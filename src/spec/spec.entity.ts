import mongoose from '../db';
import { SpecOptionSchema } from './specOption.entity';

const { Schema } = mongoose;


export const SpecSchema = new Schema({
    name: String,
    description: String,
    options: [SpecOptionSchema],
    status: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Spec = mongoose.model('Spec', SpecSchema, 'specs');
