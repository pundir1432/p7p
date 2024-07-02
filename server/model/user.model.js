const mongoose = require("mongoose");
const { Schema } = mongoose;

const userModel = new Schema(
    {
        firstname:{
            type: String,
            required: true
        },
        lastname:{
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        phoneNumber:{
            type: Number,
            required: true
        },
        
    },
    { versionKey: false, timestamps: true }
);

const user = mongoose.model("users", userModel);

module.exports = user;