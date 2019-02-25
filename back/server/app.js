const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

mongoose.Promise = Promise;
const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join('../', 'front', 'build')));
// app.use(
//   session({
//     secret: 'ok34242ewrfsfsf',
//     resave: false,
//     saveUninitialized: true,
//     store: new MongoStore({ mongooseConnection: mongoose.connection }),
//     httpOnly: true,
//     maxAge: 60 * 60 * 100
//   })
// );
app.use(
  session({
    secret: 'passport-tutorial',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: false
  })
);

mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });
mongoose.set('debug', true);
mongoose.connection.on('connected', () => {
  console.info('MongoDB Database is successfully connected');
});

require('./model/user');
require('./model/Accounts');
require('./config/passport');
app.use(require('./routes'));

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

app.get('/', (req, res) => {
  res.sendFile(path.join('../', 'front', 'build', 'index.html'));
});

module.exports = app;
