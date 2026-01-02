const JWT = require("jsonwebtoken");

const secret = "Superman@123";

function createTokenForProduct(product) {
  const payload = {
    _id: product._id,
    email: product.email,
    profileImageUrl: product.profileImageUrl,
    role: product.role,
  };
  const token = JWT.sign(payload, secret);
  return token;
}

function validateToken(token) {
  const payload = JWT.verify(token, secret);
  return payload;
}
module.exports = {
  createTokenForProduct,
  validateToken,
};
