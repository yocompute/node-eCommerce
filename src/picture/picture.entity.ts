import mongoose from '../db';

const { Schema } = mongoose;

export const PictureSchema = new Schema({
    name: String,
    url: String
})

