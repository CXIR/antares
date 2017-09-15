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
    else res.json({result:0, message:'Metal not found w/ url 03-001'});
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
    if(metal) res.json({result:1, content:metal});
    else res.json({result:0, message:'Metal not found w/ url 03-002'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Metal w/ url 03-002', error:err}); });
});

/******************************** POST ******************************/


/******************************* DELETE *****************************/


module.exports = router;
