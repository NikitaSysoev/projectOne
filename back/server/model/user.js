const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema(
  {
    _id: Number,
    name: String,
    password: String
  },
  {
    versionKey: false
  }
);

module.exports = mongoose.model('User', UserSchema);
