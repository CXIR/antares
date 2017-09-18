'use strict';

const express = require('express');
const models = require('../models');
const router = express.Router();

const Role = models.Role;


/******************************** GET ********************************/

/** Get all Roles | 04-001 */
router.get('/',function(req,res){

  Role.findAll()
  .then(roles => {
    let results = [];

    for(let role of roles) results.push(role.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No Role found w/ url 04-001'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Role w/ url 04-001', error:err}); });
});

/** Get a single Role | 04-002 */
router.get('/:roleID',function(req,res){

  Role.find({
    where : { 
              id : req.params.roleID
            }
  })
  .then(role => { 
    if(role) res.json({result:1, content:role.responsify()});
    else res.json({result:0, message:'Role not found w/ url 04-002'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Role w/ url 04-002', error: err}); });
});

/******************************** POST ******************************/

/** Create a Role | 04-003 */
router.post('/',function(req,res){
  let send = req.body;

  Role.find({
    where : {
              name : send.name
            }
  })
  .then(role => {
    if(role) res.json({result:0, message:'Similar Role w/ same name already exists w/ url 04-003'});
    else{

      Role.create({
        name : send.name
      })
      .then(role => {
        if(role) res.json({result:1, message:'Role successfully created w/ url 04-003'});
        else res.json({result:0, message:'Role not crearted w/ url 04-003'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to create Role w/ url 04-003', error:err}); });
    }
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Role w/ url 04-003', error:err}); });
});

/** Update a Role | 04-004 */
router.post('/update',function(req,res){
  let send = req.body;

  Role.find({
    where : {
              id : send.id
            }
  })
  .then(role => {
    if(role){
      role.updateAttributes({
        name : send.name
      });
      res.json({result:1, message:'Role successfully updated w/ url 04-004'});
    }
    else res.json({result:0, message:'Role not found w/ url 04-004'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Role w/ url 04-004', error:err}); });
});

/******************************* DELETE *****************************/

/** Drop a Role | 04-005 */
router.delete('/:roleID',function(req,res){

  Role.find({
    where : {
              id : req.params.roleID
            }
  })
  .then(role => {
    if(role){

      role.destroy()
      .then(role => {
        if(role) res.json({result:1, message:'Role successfully removed w/ url 04-005'});
        else res.json({result:0, message:'Role not removed w/ url 04-005'});
      })
      .catch(err => { res.json({result:-1, message:'Unbale to remove Role w/ url 04-005', error:err}); });
    }
    else res.json({result:0, message:'Role not found w/ url 04-005', error:err});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Role w/ url 04-005', error:err}); });
});

module.exports = router;
