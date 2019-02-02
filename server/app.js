const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const database = require('./db/database');
const User = require('./model/user');

const app = express();

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(bodyParser.json());

database.connect();

// app.use('/', express.static(path.join(__dirname, 'build')));
app.use('/static', express.static(path.join(__dirname, 'build', 'static')));
app.use(express.static(path.join('./', 'front', 'build')));
// User.deleteMany({}).then(() => {
//   const newUser = new User({ _id: 1, name: 'Morgan' });
//   const newUser2 = new User({ _id: 2, name: 'Rotts' });
//   newUser.save();
//   newUser2.save();
// });

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT, DELETE'
  );
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
