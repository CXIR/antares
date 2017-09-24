'use strict';

const express = require('express');
const models = require('../models');
const router = express.Router();

const Wear = models.Wear;


/******************************** GET ********************************/

/** Get all Wears | 06-001 */
router.get('/',function(req,res){

  Wear.findAll()
  .then(wears => {
    let results = [];

    for(let wear of wears) results.push(wear.responsify());

    if(results.length > 0) res.sjon({result:1, content:results});
    else res.json({result:0, message:'No Wear found w/ url 06-001'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Wear w/ url 06-001', error:err}); });
});

/** Get single Wear | 06-002 */
router.get('/:wearID',function(req,res){

  Wear.find({
    where : {
              id : req.params.wearID
            }
  })
  .then(wear => {
    if(wear) res.json({result:1, content:wear.responsify()});
    else res.json({result:0, message:'Wear not found w/ url 06-002'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Wear w/ url 06-002', error:err}); });
});

/******************************** POST ******************************/

/** Create a Wear | 06-003 */
router.post('/',function(req,res){
  let send = req.body;

  Wear.find({
    where : {
              name : send.name
            }
  })
  .then(wear => {
    if(wear) res.json({result:0, message:'Similar Wear w/ same name already exists w/ url 06-003'});
    else{

      Wear.create({
        name : send.name
      })
      .then(wear => {
        if(wear) res.json({result:1, message:'Wear successfully created w/ url 06-003'});
        else res.json({result:0, message:'Wear not created w/ url 06-003'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to create Wear w/ url 06-003', error:err}); });
    }
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Wear w/ url 06-003', error:err}); });
});

/** Update a Wear | 06-004 */
router.post('/update',function(req,res){
  let send = req.body;

  Wear.find({
    where : {
              id : send.wear
            }
  })
  .then(wear => {
    if(wear){
      wear.updateAttributes({
        name : send.name
      });
      res.json({result:1, message:'Wear successfully updated w/ url 06-004'});
    }
    else res.json({result:0, message:'Wear not found w/ url 06-004'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Wear w/ url 06-004', error:err}); });
});

/******************************* DELETE *****************************/

/** Drop a Wear | 06-005 */
router.delete('/wearID',function(req,res){

  Wear.find({
    where : {
              id : req.params.wearID
            }
  })
  .then(wear => {
    if(wear){
      wear.destroy()
      .then(wear => {
        if(wear) res.json({result:1, message:'Wear successfully removed w/ url 06-005'});
        else res.json({result:0, message:'Wear not removed w/ url 06-005'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to remove Wear w/ url 06-005', error,err}); });
    }
    else res.json({result:0, message:'Wear not found w/ url 06-005'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Wear w/ url 06-005', error,err}); });
});

module.exports = router;
