// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using module.exports
module.exports = mongoose.model('User', new Schema({
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  first_name: String,
  last_name: String,
  email: String,
  phone: String,
  address_1: String,
  address_2: String,
  bio: String,
  username: { type: String, unique: true },
  photo: String,
  password: String,
}));
