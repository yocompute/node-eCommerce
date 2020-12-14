import mongoose from '../db';

const { Schema, Types } = mongoose;

export const PictureSchema = new Schema({
    name: String,
    url: String
})

