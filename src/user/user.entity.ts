import mongoose from '../db';

const { Schema, Types } = mongoose;

const UserSchema = new Schema({
    _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    username: String,
    email: String,
    phone: String,
    balance: {Number, default: 0},
    creatUTC: {Date, default: new Date()},
})

export const User = mongoose.model('User', UserSchema, 'users');

// import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

// @Entity({name: "users"})
// export class User {

//     @ObjectIdColumn()
//     _id: ObjectID | undefined;

//     @Column()
//     username: string;

//     // @Column()
//     // password: string | undefined;

//     @Column()
//     email: string | undefined;
    
//     @Column()
//     phone: string | undefined;

//     @Column()
//     balance: number;

//     @Column()
//     createUTC: Date;
// }
