'use strict';

const express = require('express');
const models = require('../models');
const router = express.Router();

const Coin = models.Coin;


/******************************** GET ********************************/

/** Get all Coins | 01-001 */
router.get('/',function(req,res){
  Coin.findAll({
    include : [ models.Country, models.Metal, models.Wear ]
  })
  .then(coins => {
    let results = [];

    for(let coin of coins) results.push(coin.responsify());

    if(results.length > 0) res.json({result:1, content: results});
    else res.json({result:0, message:'No Coin found w/ url 01-001'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-001', error:err}); });
});

/** Get a single Coin by ID | 01-002 */
router.get('/:coinID',function(req,res){
  Coin.find({
    where : {
              id : req.params.coinID
            },
    include : [ models.Country, models.Metal, models.Wear ]
  })
  .then(coin => {
    if(coin) res.json({result:1, content:coin.responsify()});
    else res.json({result:0, message:'No Coin found w/ url 01-002'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-002', error:err}); });
});

/** Get all Coins by Country | 01-003 */
router.get('/country/:countryID',function(req,res){
  Coin.findAll({
    where : {
              country_id : req.params.countryID
            },
    include : [ models.Country, models.Metal, models.Wear ]
  })
  .then(coins => {
    let results = [];

    for(let coin of coins) results.push(coin.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No Coin found w/ url 01-003'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-003', error:err}); });
});

/** Get all Coins by Metal | 01-004 */
router.get('/metal/:metalID',function(req,res){
  Coin.findAll({
    where : {
              metal_id : req.params.metalID
            },
    include : [ models.Country, models.Metal, models.Wear ]
  })
  .then(coins => {
    let results = [];

    for(let coin of coins) results.push(coin.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No Coin found w/ url 01-004'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-004', error:err}); });
});

/** Get all Coins by Wear | 01-005 */
router.get('/wear/:wearID',function(req,res){
  Coin.findAll({
    where : {
              wear_id : req.params.wearID
            },
    include : [ models.Country, models.Metal, models.Wear ]
  })
  .then(coins => {
    let results = [];

    for(let coin of coins) results.push(coin.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No Coin found w/ url 01-005'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-005', error:err}); });
});

/** Get all Coins royals | 01-006 */
router.get('/royal',function(req,res){
  Coin.findAll({
    where : {
              royal : 1
            },
    include : [ models.Country, models.Metal, models.Wear ]
  })
  .then(coins => {
    let results = [];

    for(let coin of coins) results.push(coin.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No Coin found w/ url 01-006'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-006', error:err}); });
});

/** Get oldest Coin | 01-007 */
router.get('/oldest',function(req,res){
  //TODO: try this before continuing this kind of filters
  Coin.min('year')
  .then(coin => {

  })
  .catch(err => { });
});

/** Get newest Coin | 01-008 */
router.get('/newest',function(req,res){

});

/** Get oldest Coin by Country | 01-009 */
router.get('/oldest/country/:countryID',function(req,res){

});

/** Get newest Coin by Country | 01-010 */
router.get('/newest/country/:countryID',function(req,res){

});

/** Get oldest Coin by Metal | 01-011 */
router.get('/oldest/metal/:metalID',function(req,res){

});

/** Get newest Coin by Metal | 01-012 */
router.get('/newest/metal/:metalID',function(req,res){

});

/******************************** POST ******************************/

/** Create a Coin | 01-0XX */
router.post('/',function(req,res){
  let send = req.body;

});

/** Update a Coin | 01-0XX */
router.post('/update',function(req,res){
  let send = req.body;

});

/******************************* DELETE *****************************/

/** Drop single Coin | 01-0XX */
router.delete('/:coinID',function(req,res){
  Coin.find({
    where : {
              id : req.params.coinID
            }
  })
  .then(coin => {
    if(coin){
      coin.destroy()
      .then(coin => {
        if(coin) res.json({result:1, message:'Coin successfully removed w/ url 01-0XX'});
        else res.json({result:0, message:'Coin not removed w/ url 01-0XX'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to remove Coin w/ url 01-0XX', error:err}); });
    }
    else res.json({result:0, message:'No Coin found w/ url 01-0XX'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-0XX', error:err}); });
});

module.exports = router;
