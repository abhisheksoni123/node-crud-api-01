const User = require("../models/user");

async function handleCreateUser(req, res) {
  const { fullName, email, password } = req.body;
  const user = await User.create({
    fullName,
    email,
    password,
  });
  res.status(200).json({
    user: {
      _id: user._id,
      email: user.email,
      role: user.role,
    },
  });
}

async function handleLoginUser(req, res) {
  const { email, password } = req.body;

  try {
    const user = await User.matchPassword(email, password);

    // ✅ Success response
    res.status(200).json({
      user: {
        _id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(401).json({
      error: err.message || "Invalid email or password",
    });
  }
}

module.exports = {
  handleCreateUser,
  handleLoginUser,
};
