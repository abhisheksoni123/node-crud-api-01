const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const allDbUsers = await User.find({});
  return res.json(allDbUsers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  return res.json(user);
}

async function handleDeleteUsers(req, res) {
  const user = await User.deleteMany();
  return res.json(user);
}

// CREATE product
async function handleCreateNewUser(req, res) {
  try {
    const { title, price, description, category, image, rating } = req.body;

    if (!title || price === undefined) {
      return res.status(400).json({ message: "Title and price are required" });
    }

    const product = await User.create({
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
    const userId = req.params.id;
    const { rate } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
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

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.json({
      message: "Rating updated",
      data: updatedUser,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleCreateNewUser,
  handleDeleteUsers,
  handlePatchRating,
};
