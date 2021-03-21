import { Model as MongooseModel, Document } from 'mongoose';
import mongoose from '../db';
import { IPermission, PermissionSchema } from '../permission/permission.entity';

const { Schema } = mongoose;

export interface IRole extends Document{
    name: string,
    description: string,
    permissions: IPermission[],
    status: string,
    createUTC: Date,
    updateUTC?: Date,
}

const RoleSchema = new Schema({
    name: String,
    description: String,
    permissions: [PermissionSchema],
    status: String,
    createUTC: {type: Date, default: new Date()},
    updateUTC: Date,
})

export const Role: MongooseModel<IRole> = mongoose.model<IRole>('Role', RoleSchema, 'roles');

