const express = require('express');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');

const User = require('./model/user');

mongoose.Promise = Promise;
mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.info('MongoDB Database is connected');
});

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'ok34242ewrfsfsf',
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    httpOnly: true,
    maxAge: 60 * 60 * 100
  })
);

app.use('/static', express.static(path.join(__dirname, 'build', 'static')));
app.use(express.static(path.join('./', 'front', 'build')));
// app.use(express.static(path.join(__dirname, 'build')));

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
  // res.sendFile(path.join(__dirname, 'build', 'index.html'));
  res.sendFile(path.join('./', 'front', 'build', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.status(200).send('Admin panel');
});

app.get('/api/hello', (req, res) => {
  res.status(200).send({
    message: 'Hello world'
  });
});

app.get('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findById(id).then(
    user => {
      if (!user) {
        return res.status(404).send();
      }
      return res.send(user);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.get('/api/users', (req, res) => {
  User.find().then(
    users => {
      res.send(users);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.post('/api/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save().then(
    user => {
      res.send(user);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.put('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findOneAndUpdate({ _id: id }, { $set: req.body }).then(
    user => {
      res.send(user);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

app.delete('/api/users/:id', (req, res) => {
  const { id } = req.params;
  User.findOneAndRemove({ _id: id }).then(
    user => {
      if (!user) {
        return res.status(404).send();
      }
      return res.send(user);
    },
    e => {
      res.status(400).send(e);
    }
  );
});

module.exports = app;
