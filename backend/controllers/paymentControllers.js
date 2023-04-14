// In controllers/paymentController.js
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create a Payment Intent
exports.createPaymentIntent = async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });
  res.json({ clientSecret: paymentIntent.client_secret });
};

// Handle Stripe Webhook
exports.handleWebhook = async (req, res) => {
  const payload = req.body;
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Error", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    // Update user's credits in the database
  }
  res.sendStatus(200);
};
