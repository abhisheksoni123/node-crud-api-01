const User = require("../models/user");

async function handleCreateUser(req, res) {
  const { fullName, email, password } = req.body;
  await User.create({
    fullName,
    email,
    password,
  });
  res.status(201).json({
    message: "User registered successfully",
  });
}

async function handleLoginUser(req, res) {
  const { email, password } = req.body;
  try {
    console.log("email is", email);
    console.log("password is", password);

    const isValid = await User.matchPassword(email, password);

    if (!isValid) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 3️⃣ Success
    res.status(200).json({
      message: "Login successful",
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
