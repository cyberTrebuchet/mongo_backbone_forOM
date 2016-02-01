'use strict';

var express = require('express');
var router  = express.Router();

router.get('/', function(req, res, next) {
  console.log('Home route hit!');
  res.send('index.html');
});

module.exports = router;
