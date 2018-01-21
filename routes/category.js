'use strict';

const express = require('express');
const router = express.Router();

const sequelize = require('sequelize');
const models = require('../models');

router.get('/france', function (req,res) {
  var data = {
               tab         : "france",
               title       : "La France",
               description : "Toutes les monnaies de France, de XXXX à XXXX, hors Argenterie",
               number      : 452,
               value       : 1286,
               royal       : 17,
               sub         : 'all'
             };

  res.render( 'category', data );
});

router.get('/world', function (req,res) {
  var data = {
               tab         : "world",
               title       : "Le Monde",
               description : "Toutes les monnaies du Monde, de XXXX à XXXX, hors France et Argenterie",
               number      : 642,
               value       : 864,
               royal       : 6
             };

  res.render( 'category', data );
});

router.get('/silver', function (req,res) {
  var data = {
               tab         : "silver",
               title       : "L'Argenterie",
               description : "Toutes les monnaies en Argent, de XXXX à XXXX, du Monde et de France",
               number      : 41,
               value       : 3275,
               royal       : 33
             };

  res.render( 'category', data );
});

module.exports = router;
