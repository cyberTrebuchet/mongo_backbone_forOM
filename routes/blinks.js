'use strict';

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var mongoose = require ('mongoose');
var Blink = require ('../models/Blink');

router.get('/', function(req, res, next) {
  Blink.find(function (err, blinks) {
    if (err) return next(err);
    res.json(blinks);
  });
});

router.post('/', jsonParser, function(req, res, next) {
  console.log('\n\nReceived post request to /blinks:\n\n', req.body)
  Blink.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
