const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Users = mongoose.model('User', UserSchema);

module.exports = Users;
