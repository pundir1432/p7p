const mongoose = require("mongoose");
const { Schema } = mongoose;

const productModel = new Schema(
    {
        title: {
            type: String,
            enum: [
                "clothes",
                "mobile",
                "Shoes",
                "Camera",
                "earbuds",
                "goggles",
                "watch"
            ],
            required: true
        },
        image: {
            type: [String],
            required: true,
        }
    },
    { versionKey: false, timestamps: true }
);

const product = mongoose.model("product", productModel);

module.exports = product;
