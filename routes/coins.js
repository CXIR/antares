'use strict';

const express = require('express');
const models = require('../models');
const router = express.Router();
const sequelize = require('sequelize');

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
router.get('/royal/all',function(req,res){

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

/** Get oldest Coin year | 01-007 */
router.get('/oldest/single',function(req,res){

  Coin.min('year')
  .then(min => {
    if(min) res.json({result:1, content:min});
    else res.json({result:0, message:'Coin not found w/ url 01-007'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-007', error:err}); });
});

/** Get newest Coin year | 01-008 */
router.get('/newest/single',function(req,res){

  Coin.max('year')
  .then(max => {
    if(max) res.json({result:1, content:max});
    else res.json({result:0, message:'Coin not found w/ url 01-008'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-008', error:err}); });
});

/** Get oldest Coin year by Country | 01-009 */
router.get('/oldest/country/:countryID',function(req,res){

  Coin.min('year',{
    where : {
              country_id : req.params.countryID
            }
  })
  .then(min => {
    if(min) res.json({result:1, content:min});
    else res.json({result:0, message:'Coin not found w/ url 01-009'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-009', error:err}); });
});

/** Get newest Coin year by Country | 01-010 */
router.get('/newest/country/:countryID',function(req,res){

  Coin.max('year',{
    where : {
              country_id : req.params.countryID
            }
  })
  .then(max => {
    if(max) res.json({result:1, content:max});
    else res.json({result:0, message:'Coin not found w/ url 01-010'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-010', error:err}); });
});

/** Get oldest Coin year by Metal | 01-011 */
router.get('/oldest/metal/:metalID',function(req,res){

  Coin.min('year',{
    where : {
              metal_id : req.params.metalID
            }
  })
  .then(min => {
    if(min) res.json({result:1, content:min});
    else res.json({result:0, message:'Coin not found w/ url 01-011'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-011', error:err}); });
});

/** Get newest Coin year by Metal | 01-012 */
router.get('/newest/metal/:metalID',function(req,res){

  Coin.max('year',{
    where : {
              metal_id : req.params.metalID
            }
  })
  .then(max => {
    if(max) res.json({result:1, content:max});
    else res.json({result:0, message:'Coin not found w/ url 01-012'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-012', error:err}); });
});

/** Get total Coin price | 01-0XX */
router.get('/price/single',function(req,res){

  Coin.sum('price')
  .then(price => {
    if(price) res.json({result:1, content:price});
    else res.json({result:0, message:'Coin not found w/ url 01-012'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-012', error:err}); });
});

/** Get total Coin price by Country | 01-0XX */
router.get('/price/country/:countryID',function(req,res){

  Coin.sum('price',{
    where : {
              country_id : req.params.countryID
            }
  })
  .then(price => {
    if(price) res.json({result:1, content:price});
    else res.json({result:0, message:'Coin not found w/ url 01-012'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-012', error:err}); });
});

/** Get total Coin price by Metal | 01-0XX */
router.get('/price/metal/:metalID',function(req,res){

  Coin.sum('price',{
    where : {
              metal_id : req.params.metalID
            }
  })
  .then(price => {
    if(price) res.json({result:1, content:price});
    else res.json({result:0, message:'Coin not found w/ url 01-012'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find coin w/ url 01-012', error:err}); });
});

/******************************** POST ******************************/

/** Create a Coin | 01-013 */
router.post('/',function(req,res){
  let send = req.body;

  models.Country.find({
    where : {
              id : send.country
            }
  })
  .then(country => {
    if(country){

      models.Metal.find({
        where : {
                  id : send.metal
                }
      })
      .then(metal => {
        if(metal){

          models.Wear.find({
            where : {
                      id : send.wear
                    }
          })
          .then(wear => {
            if(wear){

              Coin.create({
                value        : send.value,
                year         : send.year,
                description  : send.description,
                registration : send.registration,
                price        : send.price,
                royal        : send.royal
              })
              .then(coin => {
                if(coin){

                  coin.setCountry(country)
                  .then(country =>{

                    coin.setMetal(metal)
                    .then(metal => {


                      coin.setWear(wear)
                      .then(wear => {

                        res.json({result:1, message:'Coin successfully created w/ url 01-013'});
                      })
                      .catch(err => { res.json({result:-1, message:'Unable to set Country to the Coin w/ url 01-013', error:err}); });
                    })
                    .catch(err => { res.json({result:-1, message:'Unable to set Metal to the Coin w/ url 01-013', error:err}); });
                  })
                  .catch(err => { res.json({result:-1, message:'Unable to set Wear to the Coin w/ url 01-013', error:err}); });
                }
                else res.json({result:0, message:'Coin not created w/ url 01-013'});
              })
              .catch(err => { res.json({result:-1, message:'Unable to create Coin w/ url 01-013', error:err}); });
            }
            else res.json({result:0, message:'Wear not found w/ url 01-013'});
          })
          .catch(err => { res.json({result:-1, message:'Unable to find Wear w/ url 01-013', error:err}); });
        }
        else res.json({result:0, message:'Metal not found w/ url 01-013'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to find Metal w/ url 01-013', error:err}); });
    }
    else res.json({result:0, message:'Country not found w/ url 01-013'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 01-013', error:err}); });
});

/** Update a Coin price | 01-014 */
router.post('/update/price',function(req,res){
  let send = req.body;

  Coin.find({
    where : {
              id : send.coin
            }
  })
  .then(coin => {
    if(coin){

      coin.updateAttributes({
        price : send.price
      });
      res.json({result:1, message:'Coin price successfully updated w/ url 01-014'});
    }
    else res.json({result:0, message:'Coin price not updated w/ url 01-014'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-014', error:err}); });
});

/** Update a Coin Wear | 01-015 */
router.post('/update/wear',function(req,res){
  let send = req.body;

  models.Wear.find({
    where : {
              id : send.wear
            }
  })
  .then(wear => {
    if(wear){

      Coin.find({
        where : {
                  id : send.coin
                }
      })
      .then(coin => {
        if(coin){

          coin.setWear(wear)
          .then(wear => {
            res.json({result:1, message:'Coin Wear successfully updated w/ url 01-015'});
          })
          .catch(err => { res.json({result:-1, message:'Unable to update Wear to the Coin w/ url 01-015', error:err}); });
        }
        else res.json({result:0, message:'Coin not found w/ url 01-015'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01,015', error:err}); });
    }
    else res.json({result:0, message:'Wear not found w/ url 01-015'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Wear w/ url 01-015', error:err}); });
});

/******************************* DELETE *****************************/

/** Drop single Coin | 01-016 */
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
        if(coin) res.json({result:1, message:'Coin successfully removed w/ url 01-016'});
        else res.json({result:0, message:'Coin not removed w/ url 01-016'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to remove Coin w/ url 01-016', error:err}); });
    }
    else res.json({result:0, message:'No Coin found w/ url 01-016'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Coin w/ url 01-016', error:err}); });
});

module.exports = router;
