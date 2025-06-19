import mongoose, { model, Schema } from "mongoose";

import { contentTypes } from '../configs/commonConfig';

const contentSchma = new Schema({
    link: {
        type: String,
        required: true,

    },
    type: {
        type: String,
        enums: contentTypes,
        required: true
    },
    title: {
        type: String,
        required: true,
    },
    tag: {
        type: mongoose.Types.ObjectId,
        ref: 'tag',
        required: true
    },
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true
    }
});
export const Content = model('Content', contentSchma);


