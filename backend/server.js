// In app.js
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Create an Express app
const app = express();

// Set up middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(
  session({
    secret: "my_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Set up database connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Test database connection
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Connected to database");
  connection.release();
});

// Configure passport
passport.use(
  new LocalStrategy((username, password, done) => {
    pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) return done(err);
        if (!results[0])
          return done(null, false, { message: "Incorrect username." });
        if (results[0].password !== password)
          return done(null, false, { message: "Incorrect password." });
        return done(null, results[0]);
      }
    );
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  pool.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) return done(err);
    done(null, results[0]);
  });
});

// Create payment intent
app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount,
    currency: "usd",
  });
  res.json({ clientSecret: paymentIntent.client_secret });
});

// Handle Stripe webhook
app.post("/stripe-webhook", async (req, res) => {
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
    const userId = paymentIntent.metadata.userId;
    const amount = paymentIntent.amount;
    pool.query(
      "UPDATE users SET credits = credits + ? WHERE id = ?",
      [amount / 100, userId],
      (err, results) => {
        if (err) throw err;
        console.log(`Updated ${results.changedRows} rows`);
      }
    );
  }
  res.sendStatus(200);
});

// Set up routes
app.use("/auth", require("./routes/auth"));
app.use("/payment", require("./routes/payment"));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
