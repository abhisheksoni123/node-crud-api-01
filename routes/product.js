const express = require("express");
const {
  handleGetAllProducts,
  handleGetProductById,
  handleCreateNewProduct,
  handleDeleteProducts,
  handlePatchRating,
} = require("../controllers/product");

const router = express.Router();

// Routes
router.route("/:id").get(handleGetProductById).patch(handlePatchRating);

router
  .route("/")
  .get(handleGetAllProducts)
  .post(handleCreateNewProduct)
  .delete(handleDeleteProducts);

module.exports = router;
