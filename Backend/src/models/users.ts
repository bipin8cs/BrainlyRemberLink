import mongoose, { model, Schema } from "mongoose";
const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
export const User = model('User', userSchema);

