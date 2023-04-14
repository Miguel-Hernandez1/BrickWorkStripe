// In routes/payment.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Create a Payment Intent
router.post("/create-payment-intent", paymentController.createPaymentIntent);

module.exports = router;
