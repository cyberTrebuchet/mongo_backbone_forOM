'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require ('mongoose');
var User = require ('../models/User');

router.get('/', function(req, res, next) {
  console.log('Users route hit!');
  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;
