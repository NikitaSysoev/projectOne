const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Accounts = mongoose.model('Accounts');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]'
    },
    (email, password, done) => {
      Accounts.findOne({ email })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, { errors: { 'email or password': 'is invalid' } });
          }

          return done(null, user);
        })
        .catch(done);
    }
  )
);