import mongoose from '../db';
const { Schema } = mongoose;

const QrcodeSchema = new Schema({
    // _id: {type: Types.ObjectId, default: new Types.ObjectId()},
    name: String,
    description: String,
    status: String,
    brand: { type: Schema.Types.ObjectId, ref: 'Brand' },
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Qrcode = mongoose.model('Qrcode', QrcodeSchema, 'qrcodes');

// import {Entity, PrimaryColumn, ObjectID, Column, ObjectIdColumn} from "typeorm";

// @Entity({name: "qrcodes"})
// export class Qrcode {

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
