'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require ('mongoose');
var PUser = require ('../models/User');

router.get('/', function(req, res, next) {
  console.log('Home route hit!');
  res.send('Hello, world.');
});

module.exports = router;
