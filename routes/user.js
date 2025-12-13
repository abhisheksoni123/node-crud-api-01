const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
} = require("../controllers/user");

const router = express.Router();

// Routes
router.get("/:id", handleGetUserById);

router.route("/").get(handleGetAllUsers).post(handleCreateNewUser);

module.exports = router;
