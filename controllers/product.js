const Product = require("../models/product");

async function handleGetAllProducts(req, res) {
  const allDbProducts = await Product.find({});
  return res.json(allDbProducts);
}

async function handleGetProductById(req, res) {
  const product = await Product.findById(req.params.id);
  return res.json(product);
}

async function handleDeleteProducts(req, res) {
  const product = await Product.deleteMany();
  return res.json(product);
}

// CREATE product
async function handleCreateNewProduct(req, res) {
  try {
    const { title, price, description, category, image, rating } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const product = await Product.create({
      title,
      price,
      description,
      category,
      image,
      rating,
    });

    return res.status(201).json({
      message: "Product created successfully",
      id: product._id,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

async function handlePatchRating(req, res) {
  try {
    const productId = req.params.id;
    const { rate } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        $set: {
          "rating.rate": rate ?? 0,
        },
        $inc: {
          "rating.count": 1,
        },
      },
      {
        new: true,
        upsert: false,
        runValidators: true,
      }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.json({
      message: "Rating updated",
      data: updatedProduct,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  handleGetAllProducts,
  handleGetProductById,
  handleCreateNewProduct,
  handleDeleteProducts,
  handlePatchRating,
};
