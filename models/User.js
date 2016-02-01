'use strict';

var mongoose = require ('mongoose');

var userSchema = new mongoose.Schema({
  name: { type: String, trim: true }
});

module.exports = mongoose.model('Users', userSchema);
