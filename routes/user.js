const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleDeleteUsers,
  handlePatchRating,
} = require("../controllers/user");

const router = express.Router();

// Routes
router.route("/:id").get(handleGetUserById).patch(handlePatchRating);

router
  .route("/")
  .get(handleGetAllUsers)
  .post(handleCreateNewUser)
  .delete(handleDeleteUsers);

module.exports = router;
