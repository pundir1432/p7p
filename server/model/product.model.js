const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema(
    {
        categoryId:{
            type: mongoose.Schema.Types.ObjectId,
            ref: "category",
        },
        name: {
            type: String,
            // required: true
        },
        image: {
            type: String,
            required: true,
        },
        quantity: {
            type: Number,
        },
        price: {
            type: Number,
            required: true,
        },
        date: {
            type: Date,
            default: Date.now,
            required: true,
        },
        description:{
            type: String,
            required: true,
        },

    },
    { versionKey: false, timestamps: true }
);

const product = mongoose.model("product", productModel);

module.exports = product;
