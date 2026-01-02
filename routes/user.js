const { Router } = require("express");

const { handleCreateUser, handleLoginUser } = require("../controllers/user");

const router = Router();

router.route("/signup").post(handleCreateUser);

router.route("/signin").post(handleLoginUser);

module.exports = router;
