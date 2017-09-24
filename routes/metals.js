'use strict';

const express = require('express');
const models = require('../models');
const router = express.Router();

const Metal = models.Metal;


/******************************** GET ********************************/

/** Get all Metals | 03-001 */
router.get('/',function(req,res){
  Metal.findAll()
  .then(metals => {
    let results = [];

    for(let metal of metals) results.push(metal.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No Metal found w/ url 03-001'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Metal w/ url 03-001', error:err}); });
});

/** Get single Metal by ID | 03-002 */
router.get('/:metalID',function(req,res){
  Metal.find({
    where : {
              id : req.params.metalID
            }
  })
  .then(metal => {
    if(metal) res.json({result:1, content:metal.responsify()});
    else res.json({result:0, message:'Metal not found w/ url 03-002'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Metal w/ url 03-002', error:err}); });
});

/******************************** POST ******************************/

/** Create a new Metal | 03-003 */
router.post('/',function(req,res){
  let send = req.body;

  Metal.find({
    where : {
              name : send.name
            }
  })
  .then(metal => {
    if(metal) res.json({result:0, message:'Similar Metal w/ same name already exists w/ url 03-003'});
    else{

      Metal.find({
        where : {
                  iso : send.iso
                }
      })
      .then(metal => {
        if(metal) res.json({result:0, message:'Similar Metal w/ same iso already exists w/ url 03-003'});
        else{
          Metal.create({
            name : send.name,
            iso  : send.iso
          })
          .then(metal => {
            if(metal) res.json({result:1, message:'Metal successfully created w/ url 03-003'});
            else res.json({result:0, message:'Metal not created w/ url 03-003'});
          })
          .catch(err => { res.json({result:-1, message:'Unable to create Metal w/ url 03-003', error:err}); });
        }
      })
      .catch(err => { res.json({result:-1, message:'Unable to find Metal w/ url 03-003', error:err}); });
    }
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Metal w/ url 03-003', error:err}); });
});

/** Update a Metal | 03-004 */
router.post('/update',function(req,res){
  let send = req.body;

  Metal.find({
    where : {
              id : send.metal
            }
  })
  .then(metal => {
    if(metal){

      metal.updateAttributes({
        name : send.name,
        iso  : send.iso
      });
      res.json({result:1, message:'Metal successfully updated w/ url 03-004'});
    }
    else res.json({result:0, message:'Metal not found w/ url 03-004'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Metal w/ url 03-004', error:err}); });
});

/******************************* DELETE *****************************/

/** Drop a Metal | 03-005 */
router.delete('/:metalID',function(req,res){

  Metal.find({
    where : {
              id : req.params.metalID
            }
  })
  .then(metal => {
    if(metal){

      metal.destroy()
      .then(metal => {
        if(metal) res.json({result:1, message:'Metal successfully removed w/ url 03-005'});
        else res.json({result:0, message:'Metal not removed w/ url 03-005'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to remove Metal w/ url 03-005', error:err}); });
    }
    else res.json({result:0, message:'Metal not found w/ url 03-005'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Metal w/ url 03-005', error:err}); });
});

module.exports = router;
