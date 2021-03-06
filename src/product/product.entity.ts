import { Model as MongooseModel, Document } from 'mongoose';
import { IBrand } from '../brand/brand.entity';
import { ICategory } from '../category/category.entity';
import mongoose from '../db';
import { PictureSchema } from '../picture/picture.entity';
import { ISpec, SpecSchema } from '../spec/spec.entity';
import { IPicture } from '../uploader/uploader.model';
const { Schema } = mongoose;

export interface IAddition{
    type: string
  }
  
  export interface IProduct extends Document{
    name: string,
    description: string,
    price: number,
    saleTaxRate: number,
    cost: number,
    purchaseTaxRate: number,
    pictures: IPicture[],
    specs: ISpec[],
    type: string, // S: single, C: combo, A: addition
    additions: IAddition[],// addition product id array
    status: string,
    brand: IBrand | string,
    category: ICategory | string,
    createUTC: Date,
    updateUTC?: Date,
  }

const ProductSchema = new Schema({
    // _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    name: String,
    description: String,
    price: Number,
    saleTaxRate: Number,
    cost: Number,
    purchaseTaxRate: Number,
    pictures: [PictureSchema],
    specs: [SpecSchema],
    type: String, // S: single, C: combo, A: addition
    additions: {
        type: [String],
        required: false,
        default: undefined
    }, // addition product id array
    status: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Product: MongooseModel<IProduct> = mongoose.model<IProduct>('Product', ProductSchema, 'products');
