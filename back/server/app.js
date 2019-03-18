const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
// const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

mongoose.Promise = Promise;

const app = express();
// const User = require('./model/user');
const Account = require('./model/Account');
app.use(require('./routes'));

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });
mongoose.set('debug', true);

app.use(cors());
app.use(express.cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({ secret: 'secret' }));

// Passport:
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT, DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

app.use(express.static(path.join('../', 'front', 'build')));

app.get('/', (req, res) => {
  res.sendFile(path.join('../', 'front', 'build', 'index.html'));
});

app.get('/hello', (req, res) => {
  res.status(200).send({
    message: 'Hello world'
  });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    function(username, password, done) {
      Account.findOne({ username }, function(err, user) {
        let result;
        if (err) result = done(err);
        if (user) {
          if (password === user.password) {
            result = done(null, user);
          }
          if (password !== user.password) {
            result = done(null, false, { message: 'Incorrect password' });
          }
        }
        if (!user) {
          result = done(null, false, { message: 'Incorrect username.' });
        }
        return result;
      });
    }
  )
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Account.findById(id, function(err, user) {
    return err ? done(err) : done(null, user);
  });
});

// Endpoint to login
app.post('/login', passport.authenticate('local'), function(req, res) {
  res.send(req.user);
});

// Endpoint to get current user
app.get('/register', function(req, res) {
  res.send(req.user);
});

// Endpoint to logout
app.get('/logout', function(req, res) {
  req.logout();
  res.send(null);
});

module.exports = app;
