import mongoose from '../db';

const { Schema } = mongoose;

const CategorySchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    status: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Category = mongoose.model('Category', CategorySchema, 'categories');

// import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

// @Entity({name: "categories"})
// export class Category {

//     @ObjectIdColumn()
//     _id: ObjectID | undefined;

//     @Column()
//     name: string;

//     @Column()
//     description: string | undefined;
    
//     @Column()
//     imageUrl: string | undefined;

//     @Column()
//     createUTC: Date;

//     @Column()
//     updateUTC: Date;
// }
