const productModel = require('../model/product.model')

const createProduct = async (req, res) => {
    try {
      console.log('Request Body:', req.body);
      console.log('Request Files:', req.files);
      
      const { title } = req.body;
      const images = req.files;
  
      if (!images || images.length === 0) {
        return res.status(400).json({ status: 400, message: "No images uploaded" });
      }
  
      const existingProduct = await productModel.findOne({ title });
      if (existingProduct) {
        return res.status(400).json({ status: 400, message: "Product with the same name already exists" });
      }
  
      const imageNames = images.map(image => image.originalname);
      const result = await productModel.create({ title, image: imageNames });
      return res.status(200).json({ status: 200, message: "Product added successfully", response: result });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ status: 500, message: error.message });
    }
};

const getProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    return res.status(200).json({ status: 200, message: "Products retrieved successfully", response: products });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, message: error.message });
  }
}

const getOneProduct = async(req, res) => {
  try {
    const product = await productModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ status: 404, message: "Product not found" });
    }
    return res.status(200).json({ status: 200, message: "Product retrieved successfully", response: product });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, message: error.message });
  }
}
const deleteProduct = async(req, res)=>{
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ status: 200, message: "Product deleted successfully", response: product });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ status: 500, message: error.message });
  }
}

module.exports = {
    createProduct,
    getProducts,
    deleteProduct,
    getOneProduct
};
