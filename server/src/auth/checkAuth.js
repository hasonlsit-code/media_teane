const jwt = require("jsonwebtoken");

const createAccessToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
    algorithm: "HS256",
  });
};
const createRefreshToken = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
    algorithm: "HS256",
  });
};
module.exports = { createAccessToken, createRefreshToken };
