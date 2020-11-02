const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
const mysql = require('../data/db');

async function put_order_from_cart(order_id){
    let[err,cart]=await to(mysql.Cart.findAll({
        where:{
            order_id:order_id
        }
    }))
    if(err)
        res.json("Error");
    let{product_name,product_id,price,p_Description,customer_name,customer_id,quantity}=cart[0].dataValues;
    let pname=product_name;
    let pid=product_id;
    let pricee=price;
    let pDescription=p_Description;
    let cust_name=customer_name;
    let cust_id=customer_id;
    let quantityy=quantity;


    const result = await to(mysql.Cart.update(
        { Order_status:"ORDERED" },
        { where: { order_id:order_id } }
      ));

    let[errr,order]=await to(mysql.Orders.create({
        product_name:pname,
        product_id:pid,
        price:quantity*pricee,
        p_Description:pDescription,
        customer_name:cust_name,
        customer_id:cust_id,
        quantity:quantityy

    }))
    if(errr){
        return[err,null];
    
    }
    return[null,order];
};
//put order from product directly
async function put_order_from_product(product_id,customer_id,quantity){
    let[err,product]=await to(mysql.Product.findAll({
        where:{
           id :product_id
        }
    }))
    if(err)
        res.json("Error");
    let{id,name,price,Description}=product[0].dataValues;
    let pname=name;
    let pid=id;
    let pricee=price;
    let pDescription=Description;
    //let cust_name=customer_name;
    let cust_id=customer_id;
    let quantityy=quantity;

    let[errr,order]=await to(mysql.Orders.create({
        product_name:pname,
        product_id:pid,
        //price:pricee,
        p_Description:pDescription,
        //customer_name:cust_name,
        customer_id:cust_id,
        quantity:quantityy,
        price:quantity*pricee

    }))
    if(errr){
        return[err,null];
    
    }
    return[null,order];
};



//get order by order id


//get order by cust id

async function get_order_cust_id(cust_id)
{
    let [err, ORDER] = await to(mysql.Orders.findAll({
        where:{
            customer_id:cust_id
        }
    }));

    return ORDER;
}

async function get_order_id(id)
{
    let [err, ORDER] = await to(mysql.Orders.findAll({
        where:{
            id:id
        }
    }));

    return ORDER;
}

//app.get("")

module.exports={
        put_order_from_product,
        put_order_from_cart,
        get_order_cust_id,
        get_order_id}