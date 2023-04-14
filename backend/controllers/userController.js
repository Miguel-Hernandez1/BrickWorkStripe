// In controllers/userController.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const pool = require("../config/database");

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
