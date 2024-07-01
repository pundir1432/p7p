const mongoose = require("mongoose");
const { Schema } = mongoose;

const categoryModel = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        status: {
            type: Boolean,
            required: true,
        }
    },
    { versionKey: false, timestamps: true }
);

const category = mongoose.model("category", categoryModel);

module.exports = category;
