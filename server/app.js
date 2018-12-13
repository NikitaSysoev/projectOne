const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const User = require('./model/user');
const database = require('./db/database');

database.connect();
const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());

app.use(express.static(path.join('./', 'alfa', 'build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/', (req, res) => {
  res.sendFile(path.join('./', 'alfa', 'build', 'index.html'));
});

app.get('/api/hello', (req, res) => {
  res.status(200).send({
    message: 'Hello world',
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
  User.findOneAndDelete(id).then(
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
