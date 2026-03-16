const express = require("express");
const router = express.Router();

const { asyncHandler } = require("../auth/checkAuth");
const { authUser } = require("../middleware/authUser");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const usersController = require("../controllers/user.controller");

router.post("/register", asyncHandler(usersController.register));
router.post("/login", asyncHandler(usersController.login));
router.get("/auth", authUser, asyncHandler(usersController.authUser));
router.get("/logout", authUser, asyncHandler(usersController.logout));
router.post("/forgot-password", asyncHandler(usersController.forgotPassword));
router.post(
  "/verify-forgot-password",
  asyncHandler(usersController.verifyForgotPassword),
);
router.get("/refresh-token", asyncHandler(usersController.refreshToken));
router.post("/verify-otp", asyncHandler(usersController.verifyOTP));
router.get("/get-all-user", authUser, asyncHandler(usersController.getAllUser));
router.get(
  "/get-user/:userId",
  authUser,
  asyncHandler(usersController.getUserById),
);
router.post("/create-user", authUser, asyncHandler(usersController.createUser));
router.put(
  "/update-user/:userId",
  authUser,
  asyncHandler(usersController.updateUser),
);
router.delete(
  "/delete/:userId",
  authUser,
  asyncHandler(usersController.deleteUser),
);
module.exports = router;
