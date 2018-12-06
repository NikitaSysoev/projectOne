const mongoose = require('mongoose');

const { Schema } = mongoose;
const UserSchema = new Schema({
  id: Number,
  name: String,
});

module.exports = mongoose.model('User', UserSchema);
