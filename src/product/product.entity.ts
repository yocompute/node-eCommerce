import mongoose from '../db';

const { Schema, Types } = mongoose;

const ProductSchema = new Schema({
    _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    name: String,
    description: String,
    price: Number,
    cost: Number,
    taxRate: Number,
    imageUrl: String,
    userId: Types.ObjectId,
    creatUTC: Date,
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
