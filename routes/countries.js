'use strict';

const express = require('express');
const models = require('../models');
const router = express.Router();

const Country = models.Country;


/******************************** GET ********************************/

/** Get all Countries | 02-001 */
router.get('/',function(req,res){
  Country.findAll()
  .then(countries => {
    let results = [];

    for(let country of countries) results.push(country.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No Country found w/ url 02-001'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 02-001', error:err}); });
});

/** Get single Country by ID | 02-002 */
router.get('/:countryID',function(req,res){
  Country.find({
    where : {
              id : req.params.countryID
            }
  })
  .then(country => {
    if(country) res.json({result:1, content:country.responsify()});
    else res.json({result:0, message:'Country not found w/ url 02-002'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 02-002', error:err}); });
});

/******************************** POST ******************************/

/** Create a new Country | 02-003 */
router.post('/',function(req,res){
  let send = req.body;

  Country.find({
    where : { name : send.name }
  })
  .then(country => {
    if(country) res.json({result:0, message:'Similar Country w/ same already exists w/ url 02-003'});
    else{
        Country.find({
            where : { iso2 : send.iso2 }
        })
        .then(country => {
          if(country) res.json({result:0, message:'Similar Country w/ same iso2 already exists w/ url 02-003'});
          else{
            Country.find({
              where : { iso3 : send.iso3 }
            })
            .then(country => {
              if(country) res.json({result:0, message:'Similar Country w/ same iso3 already exists w/ url 02-003'});
              else{
                Country.find({
                  where : { number : send.number }
                })
                .then(country => {
                  if(country) res.json({result:0, message:'Similar Country w/ same number already exists w/ url 02-003'});
                  else{
                    Country.create({
                      name   : send.name,
                      iso2   : send.iso2,
                      iso3   : send.iso3,
                      number : send.number
                    })
                    .then(country => {
                      if(country) res.json({result:1, message:'Country successfully created w/ url 02-003'});
                      else res.json({result:0, message:'Country not created w/ url 02-003'});
                    })
                    .catch(err => { res.json({result:-1, message:'Unable to create Country w/ url 02-003', error:err}); });
                  }
                })
                .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 02-003', error:err}); });
              }
            })
            .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 02-003', error:err}); });
          }
        })
        .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 02-003', error:err}); });
    }
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 02-003', error:err}); });
});

/** Update a single Country | 02-004 */
router.post('/update',function(req,res){
  let send = req.body;
  //TODO: verify data before update
  Country.find({
    where : {
              id : send.id
            }
  })
  .then(country => {
    if(country){

      country.updateAttributes({
          name   : send.name,
          iso2   : send.iso2,
          iso3   : send.iso3,
          number : send.number
      });
      res.json({result:1, message:'Country successfully updated w/ url 02-004'});
    }
    else res.json({result:0, message:'Country not found w/ url 02-004'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 02-004', error:err}); });
});

/******************************* DELETE *****************************/

/** Drop a single Country | 02-005 */
router.delete('/:coutryID',function(req,res){
  Country.find({
    where : {
              id : req.params.countryID
            }
  })
  .then(country => {
    if(country){
      country.destroy()
      .then(country => {
        if(country) res.json({result:1, message:'Country successfully removed w/ url 02-005'});
        else res.json({result:0, message:'Country not removed w/ url 02-005'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to remove Country w/ url 02-005', error:err}); });
    }
    else res.json({result:0, message:'Country not found w/ url 02-005'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Country w/ url 02-004', error:err}); });
});

module.exports = router;
