const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { validateRequest } = require("../middleware/validateRequest");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

router.post("/signup-basic", async (req, res) => {
  const { email } = req.body;

  try {
    // Create or update the user with the Basic plan
    const user = await User.findOneAndUpdate(
      { email: email },
      { plan: "basic" },
      { upsert: true, new: true }
    );

    res
      .status(200)
      .json({ message: "User signed up for the Basic plan", user: user });
  } catch (error) {
    console.error("Error signing up for the Basic plan:", error);
    res.status(500).json({ error: "Error signing up for the Basic plan" });
  }
});

// Other routes (like '/create-checkout-session', '/webhook', etc.) should be here

module.exports = router;
