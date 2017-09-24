'use strict';

const express = require('express');
const models = require('../models');
const router = express.Router();

const User = models.User;


/******************************** GET ********************************/

/** Get all Users | 05-001 */
router.get('/',function(req,res){

  User.findAll({
    include : [ models.Role ]
  })
  .then(users => {
    let results = [];

    for(let user of users) results.push(user.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No User found w/ url 05-001'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-001', error:err}); });
});

/** Get all Users excepted one | 05-002 */
router.get('/all/:userID',function(req,res){

  User.findAll({
    where : {
              id : {
                      $ne : req.params.userID
                   }
            },
    include : [ models.Role ]
  })
  .then(users => {
    let results = [];

    for(let user of users) results.push(user.responsify());

    if(results.length > 0) res.json({result:1, content:results});
    else res.json({result:0, message:'No User found w/ url 05-002'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-002', error:err}); });
});

/** Get single User | 05-003 */
router.get('/:userID',function(req,res){

  User.find({
    where : {
              id : req.params.userID
            },
    include : [ models.Role ]
  })
  .then(user => {
    if(user) res.json({result:1, content:user.responsify()});
    else res.json({result:0, message:'User not found w/ url 05-003'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-003', error:err}); });
});


/******************************** POST ******************************/

/** Create a User | 05-004 */
router.post('/',function(req,res){
  let send = req.body;

  models.Role.find({
    where : send.role
  })
  .then(role => {
    if(role){

      User.find({
        where : { 
                  $or : [
                          { mail       : send.mail },
                          { identifier : send.identifier }
                        ]
                }
      })
      .then(user => {
        if(user) res.json({result:0, message:'Similar User w/ same name or same identifier already exists w/ url 05-004'});
        else{

            User.create({
                name       : send.name,
                first      : send.first,
                mail       : send.mail,
                identifier : send.identifier,
                password   : send.password
            })
            .then(user => {
              if(user){
                user.setRole(role)
                .then(role => {
                  res.json({result:1, content:user.responsify()});
                })
                .catch(err => { res.json({result:0, message:'Unable to set Role to User w/ url 05-004', error:err}); });
              }
              else res.json({result:0, message:'User not created w/ url 05-004'});
            })
            .catch(err => { res.json({result:-1, message:'Unable to create User w/ url 05-004', error:err}); });
        }
      })
      .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-004', error:err}); });
    }
    else res.json({result:0, message:'Site not found w/ url 05-004'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Site w/ url 05-004', error:err}); });
});

/** Update a User | 05-005 */
router.post('/update',function(req,res){
  let send = req.body;

  User.find({
    where : {
              id : send.id
            }
  })
  .then(user => {
    if(user){
      user.updateAttributes({
        name     : send.name,
        first    : send.first,
        mail     : send.mail,
        password : send.password
      });
      res.json({result:1, message:'User successfully updated w/ url 05-005'});
    }
    else res.json({result:0, message:'User not updated w/ url 05-005'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-005', error:err}); });
});

/** Get a User by mail | 05-006 */
router.post('/mail',function(req,res){
  let send = req.body;

  User.find({
    where : {
              mail : send.mail
            }
  })
  .then(user => {
    if(user) res.json({result:1, content:user});
    else res.json({result:0, message:'User not found w/ url 05-006'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-006', error:err}); });
});

/** Get a User by identifier | 05-007 */
router.post('/identifier',function(req,res){
  let send = req.body;

  User.find({
    where : {
              identifier : send.identifier
            }
  })
  .then(user => {
    if(user) res.json({result:1, content:user});
    else res.json({result:0, message:'User not found w/ url 05-007'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-007', error:err}); });
});

/** Update User Role | 05-008 */
router.post('/role',function(req,res){
  let send = req.body;

  models.Role.find({
    where : {
              id : send.role
            }
  })
  .then(role => {
    if(role){

      User.find({
        where : {
                  id : send.user
                }
      })
      .then(user =>{
        if(user){

          user.setRole(role)
          .then(role => {
            res.json({result:1, message:'User Role successfully updated w/ url 05-008'});
          })
          .catch(err => { res.json({result:-1, message:'Unable to set Role to User w/ url 05-008', error:err}); });
        }
        else res.json({result:0, message:'User not found w/ url 05-008'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-008', error:err}); });
    }
    else res.json({result:0, message:'Role not found w/ url 05-008'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find Role w/ url 05-008', error:err}); });
});

/******************************* DELETE *****************************/

/** Drop a User | 05-009 */
router.delete('/:userID',function(req,res){

  User.find({
    where : {
              id : req.parmas.userID
            }
  })
  .then(user => {
    if(user){

      user.destroy()
      .then(user => {
        if(user) res.json({result:1, message:'User successfully removed w/ url 05-009'});
        else res.json({result:0, message:'User not removed w/ url 05-009'});
      })
      .catch(err => { res.json({result:-1, message:'Unable to remove User w/ url 05-009', error:err}); });
    }
    else res.json({result:0, message:'User not found w/ url 05-009'});
  })
  .catch(err => { res.json({result:-1, message:'Unable to find User w/ url 05-009', error:err}); });
});

module.exports = router;
