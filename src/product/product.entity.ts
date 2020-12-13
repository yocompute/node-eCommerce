import mongoose from '../db';
import { PictureSchema } from '../picture/picture.entity';

const { Schema, Types } = mongoose;

const ProductSchema = new Schema({
    // _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    name: String,
    description: String,
    price: Number,
    saleTaxRate: Number,
    cost: Number,
    purchaseTaxRate: Number,
    pictures: [PictureSchema],
    status: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
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
