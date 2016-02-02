'use strict';

var express = require('express');
var router = express.Router();

var mongoose = require ('mongoose');
var User = require ('../models/User');

router.get('/', function(req, res, next) {

  console.log('So ya wanna list of users, eh?');

  User.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

router.post('/', function(req, res, next) {

  console.log('A new user, huzzah! and welcome!');

  User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
