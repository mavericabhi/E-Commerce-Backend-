const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
//const fs = require('fs');
//var validator = require("email-validator");
const mysql = require('../data/db');

//API to get all the products

async function get_all_products(){
    let[err,result]=await to(mysql.Product.findAll())
    if(err)
    {return[err,null];}

    //console.log(result);

    return[null,result];
    
  };
  async function get_prod_by_id( prod_id){
    let[err,result]=await to(mysql.Product.findAll({
      where:{
        id:prod_id
      }
    }))
    if(err)
    {return[err,null];}
    return[null,result];
  
  };
  async function get_prods_in_cat_id( c_id){
      let[err,result]=await to(mysql.Product.findAll({
          where:{
              category_id:c_id
          }
      }))
      if(err){
      return[err,null];}
      return[null,result];
  };

  async function product_des(pid){
    let[err,result]=await to(mysql.Product.findAll({
        attributes:['Description'],
        where:{
            id:pid
        }
    }))
    if(err){
    return[err,null];}
    return[null,result];
};
  module.exports={product_des,
                 get_prods_in_cat_id,
                 get_prod_by_id,
                 get_all_products}

/* 
  git branch branch1
  git checkout branch1
  git branch */