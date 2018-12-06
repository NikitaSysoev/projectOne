const mongoose = require('mongoose');

module.exports = {
  mongoose,
  connect: () => {
    mongoose.Promise = Promise;
    mongoose.connect(
      'mongodb://localhost/users',
      { useNewUrlParser: true },
    );
  },
  disconnect: done => {
    mongoose.disconnect(done);
  },
};
