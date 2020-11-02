const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
const mysql = require('../data/db');


async function get_all_catg()
{
    let [err, category] = await to( mysql.Category.findAll() )
    if (err){
      return[err,null];
    }
    else{
        return[null,category];
    }
};

async function get_category_by_id(cid){
    let[err,result]=await to(mysql.Category.findAll(
        {/* attributes: {exclude: ['createdAt', 'updatedAt']}, */ 
            where:{
                id: cid
            }
        }
    ));
    if(err)
    {
      return [err, null];
    }
    return[null,result];
  };
  
  async function get_category_of_prod_id( prod_id )
  {
    //let pid=req.params.prod_id
    let[err,result]=await to(mysql.Product.findAll({
      where:{
        id:prod_id
      },
      include:[{model:mysql.Category}]
    }));
    //console.log(result);
    if(err)
    {
      return[err,null];
    }
    let{id,name,Description}=result[0].dataValues.Category.dataValues;
    let category={id,name,Description}
    return[null,category];
    
  }; 

  module.exports= { get_all_catg,
                    get_category_by_id,
                    get_category_of_prod_id
                  }