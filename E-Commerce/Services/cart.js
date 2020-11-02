const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
const mysql = require('../data/db');
const product_services = require('./Product');

//shopping cart
//shopping cart specific product quantity update
//delete by product id
//whole shopping cart delete

async function get_prod_from_cart( cust_id ) {

    let [err, PRODUCTS] = await to(mysql.Cart.findAll(
        {   attributes: {exclude: ['createdAt', 'updatedAt', 'customer_id', 'id']},
            where: {
                customer_id: cust_id
            }
        }
    ));
    
    let error;
    if(err)
        error = err;
    else if(PRODUCTS.length == 0)
        //throw new Error("emptyy !!");
        error = "Cart is empty !!";

    return [error, PRODUCTS];
}

async function emptyCart( cust_id ) {
    let [err, deleted] = await to( mysql.Cart.destroy({
        where: {
            customer_id: cust_id
        }
    }));

    return deleted;
}
async function update_prod_in_cart(product_id,quantity_new,customer_id)
{
   
    let[errrr,cart]=await to(mysql.Cart.update(
      {quantity:quantity_new},
      {where:{
          product_id:product_id,
         customer_id:customer_id

      }
      }))
    if(errrr)
    {
        return[err,null];
    }
    return[null,true];

}

async function add_to_cart(product_id,customer_id,quantity){
    let[err,result]=await to(mysql.Product.findAll({
        where:{
          id:product_id
        }
      })); 
   /*  let [err, result] = await to(product_services.get_prod_by_id(product_id.id)); */
    if(err)
    {
        res.json("ERROR");
    }
    console.log(result[0]);
    let{name,Description,price}=result[0].dataValues;
    
    let Name=name; 
    let Price=price;
    let desc=Description;
    //let id=product_id;
    
    let[errr,cust]=await to(mysql.Customers.findAll({
        where:{
            id:customer_id
        }
    }))
    if(errr)
    {
        return[err,null];
    }
    let{cname}=cust[0].dataValues;
    let customer=cname;
    //let cid=id;
    /* let abc={Name,desc,id,customer};
    res.json({abc}); */
    let[errrr,cart]=await to(mysql.Cart.create({
        product_name:Name,
        product_id:product_id,
        price:Price,
        p_Description:desc,
        customer_name:customer,
        customer_id:customer_id,
        quantity:quantity
    }))
    if(errrr)
    {
        return[err,null];
    }
    return[null,true];

};
async function remove_product_from_cart( cust_id, prod_id) {
    let [err, deleted] = await to(mysql.Cart.destroy({
        where: {
            customer_id: cust_id,
            product_id: prod_id
        }
    }));

    return deleted;
}

module.exports={remove_product_from_cart,
                add_to_cart,
                emptyCart,
                get_prod_from_cart,
                update_prod_in_cart}