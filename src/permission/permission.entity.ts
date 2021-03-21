import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';

const { Schema } = mongoose;

export interface IPermission extends Document{
    resource: string,
    actions: Map<string, boolean>,
    status: string,
    createUTC: Date,
    updateUTC?: Date,
}

export const PermissionSchema = new Schema({
    resource: String,
    actions: { type: Map, of: Boolean}, // c,r,u,d
    status: String,
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
}, { _id : false })

export const Permission: MongooseModel<IPermission> = mongoose.model<IPermission>('Permission', PermissionSchema, 'permissions');

