import mongoose, { model, Schema } from 'mongoose';

const tag = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },

})
const tags= model('tag', tag);
module.exports = tags;