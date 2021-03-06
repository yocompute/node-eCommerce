import mongoose from '../db';
import { PictureSchema } from '../picture/picture.entity';
import { SpecSchema } from '../spec/spec.entity';
const { Schema } = mongoose;

// export const ProductSpecOptionSchema = new Schema({
//     id: String,
//     name: String,
//     price: Number
// })

// export const ProductSpecSchema = new Schema({
//     name: String,
//     description: String,
//     options: [ProductSpecOptionSchema],
//     status: String,
//     brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
//     createUTC: {type: Date, default: new Date()},
//     updateUTC: Date,
// })

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

export const Product = mongoose.model('Product', ProductSchema, 'products');

// import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

// @Entity({name: "products"})
// export class Product {

//     @ObjectIdColumn()
//     _id: ObjectID | undefined;

//     @Column()
//     name: string;

//     @Column()
//     description: string | undefined;
    
//     @Column()
//     price: number;

//     @Column()
//     cost: number;

//     @Column()
//     taxRate: number;

//     @Column()
//     imageUrl: string | undefined;
    
//     @Column()
//     createUTC: Date;

//     @Column()
//     updateUTC: Date;
// }
