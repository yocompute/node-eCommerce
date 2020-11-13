import mongoose from '../db';

const { Schema, Types } = mongoose;

const AuthSchema = new Schema({
    _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    email: String,
    password: String,
    phone: String,
    userId: Types.ObjectId,
    creatUTC: Date,
})

export const Auth = mongoose.model('Auth', AuthSchema, 'auth');

// import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

// @Entity({name: "auth"})
// export class Auth {

//     @ObjectIdColumn()
//     _id: ObjectID | undefined;

//     @Column()
//     userId: ObjectID | undefined;

//     @Column()
//     email: string | undefined;
    
//     @Column()
//     phone: string | undefined;

//     @Column()
//     password: string | undefined;

//     @Column()
//     createUTC: Date;
// }
