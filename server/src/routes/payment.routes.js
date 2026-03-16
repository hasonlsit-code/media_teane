const express = require("express");
const router = express.Router();
const { authAdmin, authUser } = require("../middleware/authUser");
const { asyncHandler } = require("../auth/checkAuth");
const paymentController = require("../controllers/payment.controller");

router.post("/create", authUser, asyncHandler(paymentController.createPayment));
router.get("/vnpay-callback", asyncHandler(paymentController.vnpayCallback));
router.get("/order/:orderId", authUser, asyncHandler(paymentController.getPaymentById));

module.exports = router;
