const mongoose = require("mongoose");
const { Schema } = mongoose;

const googleAuthModel = new Schema(
    {
        googleId:{
            type: String,
            // required: true
        },
        displayName: {
            type: String,
            // required: true
        },
        email: {
            type: String,
            // required: true
        }
        
    },
    { versionKey: false, timestamps: true }
);

const googleAuth = mongoose.model("googleAuth", googleAuthModel);

module.exports = googleAuth;