import mongoose, { model, Schema } from "mongoose";
const user = new Schema({
    userName: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
const users = model('user', user);

module.exports = users;