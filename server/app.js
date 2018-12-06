const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(path.join('./', 'alfa', 'build')));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.get('/api/hello', (req, res) => {
  res.status(200).send({
    message: 'Hello world',
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join('./', 'alfa', 'build', 'index.html'));
});

module.exports = app;
