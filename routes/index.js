var express = require('express');
var router = express.Router();

const models = require('../models');
const sequelize = require('sequelize');

const Coin = models.Coin;

router.get('/', function(req, res, next) {
  data = { tab : "home" };

  res.render('index',data);

});


module.exports = router;
