var express = require('express');
var router = express.Router();
var dt = require('../data');


/* GET home page. */
router.get('/', function(req, res, next) {
  var data = { title : dt.tst() };

  res.render('index',data);
});

module.exports = router;
