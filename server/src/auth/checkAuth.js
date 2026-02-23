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
const verifyToken = async (token) => {
  const decode = await jwt.verify(token, process.env.JWT_SECRET);
  console.log(decode);
};
module.exports = { createAccessToken, createRefreshToken, verifyToken };
