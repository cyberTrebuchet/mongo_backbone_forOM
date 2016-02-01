'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require ('mongoose');
var Blink = require ('../models/Blink');

router.get('/', function(req, res, next) {
  console.log('Blinks route hit!');
  Blink.find(function (err, blinks) {
    if (err) return next(err);
    res.json(blinks);
  });
});

module.exports = router;
