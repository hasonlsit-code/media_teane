const express = require("express");
const router = express.Router();

const userController = require("../controllers/user.controller");
const { asyncHandler } = require("../auth/checkAuth");
const { authUser } = require("../middleware/authUser");

router.post("/register", asyncHandler(userController.register));
router.post("/login", asyncHandler(userController.login));
router.get("/auth", authUser, asyncHandler(userController.authUser));
router.get("/logout", authUser, asyncHandler(userController.logout));
router.post("/forgot-password", asyncHandler(userController.forgotPassword));
router.post(
  "/verify-forgot-password",
  asyncHandler(userController.verifyForgotPassword),
);
router.post("/login-google", asyncHandler(userController.loginGoogle));
module.exports = router;
