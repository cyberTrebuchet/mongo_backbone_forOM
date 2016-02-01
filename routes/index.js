'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require ('mongoose');
var PUser = require ('../models/User');

router.get('/', function(req, res, next) {
  console.log('Home route hit!');
  PUser.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

module.exports = router;
