const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';
const dbName = 'users';

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(
      `${url}/${dbName}`,
      { useNewUrlParser: true },
    );
  },
  disconnect: done => {
    mongoose.disconnect(done);
  },
};
