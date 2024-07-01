const categoryModel = require("../model/category.model")


exports.addCategory = async (req, res) => {
    try {
        const { name, status } = req.body;
        const category = await categoryModel.create({ name, status })
        return res.status(200).json({ status: 200, message: "Category added successfully", response: category });
    } catch (error) {
        return res.status(500).json({ status: 500, message: error.message });
    };
};