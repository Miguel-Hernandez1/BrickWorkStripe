const express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const mysql = require("mysql");
const router = express.Router();

// Set up database connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Set up Passport.js
passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(
      "LocalStrategy called with username:",
      username,
      "password:",
      password
    );
    pool.query(
      "SELECT * FROM users WHERE username = ?",
      [username],
      (err, results) => {
        if (err) {
          return done(err);
        }
        if (!results[0]) {
          return done(null, false, { message: "Incorrect username." });
        }
        if (results[0].password !== password) {
          return done(null, false, { message: "Incorrect password." });
        }
        return done(null, results[0]);
      }
    );
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  pool.query("SELECT * FROM users WHERE id = ?", [id], (err, results) => {
    if (err) {
      return done(err);
    }
    done(null, results[0]);
  });
});

// Handle user login
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

module.exports = router;
