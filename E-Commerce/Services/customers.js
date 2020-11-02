const express = require('express');
const app = express.Router();
const bcrypt  = require('bcrypt');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
const mysql = require('../data/db');

let salt = 'mysalt';
const generateToken = (password, salt) => {

    let token = jwt.sign(password, salt);
    return token;
}

const passwordHash = async (password) => {
  const saltRounds = 12;
  const [err, passwordHash] = await to(bcrypt.hash(password, saltRounds));
  if (err) {
      return res.send('Error while generating password hash')
  }
  return passwordHash;
};


async function get_cust_details(cust_id){
  let[err,result]=await to(mysql.Customers.findAll({
  where:{
    id:cust_id
  }}));
  if(err){
    return "ERR:SORRY NOT FOUND";
  }
  else{
    return[null,result];
  }
};

async function update_address_details(id,address){
  try {
    const result = await to(mysql.Customers.update(
      { Address:address },
      { where: { id:id } }
    ));
    return[null,result];
    }
     catch (err) {
    return[err,null];
  }

};
async function update_card_details(cust,card){
  try {
    const result = await to(mysql.Customers.update(
      { Credit:card },
      { where: { id:cust } }
    ));
    return[null,result];
    }
     catch (err) {
    return[err,null];
  }

};
async function signup(name,email,password) {
  const mail = email;
  const Name = name;
  const Password = password;

  if(!Name || !mail ||!Password){
      return "Invalid Payload";
  }

  //let [err, result] = await to( mysql.Customers.findAll());
  //var customer_id = result.length+1;
  console.log("working well till here");
  let [err, result] = await to ( mysql.Customers.findAll({
      where: {
          cname: Name
      }
  }) )
   var student = result[0];
  if(student){
      return"This username already exists";
  } 
  
  
  let encryptedPassword = await  passwordHash(password);
  let [errr, resultt] = await to(
      mysql.Customers.create({
        cname:Name,
        email:mail,
        encryptedPassword:encryptedPassword
  }) )
  if(!errr){
      return[null,resultt];
  } else{
      return[err,null]
  }
};

async function login(mail,Password) {
  console.log("Test whether its working or not");
  const email=mail;
  const password=Password;
  //let name=name;

  console.log("Just to test the working");

  if(!email){
      return "Email is required";
  }
  if(!password){
      return "Error!!!!Password is required";
  }

  let [err, result] = await to(mysql.Customers.findAll({
      where:{
          email: email
      }
  }) )
  let cust = result[0];
  if(cust == null){
      return "error:Incorrect email";
  }
  
  let [error, isValid] = await to(
      bcrypt.compare(password, cust.encryptedPassword)
  );
  //res.json("hyee");
  if(!isValid){
      return[err,null];
  }
  
  else{
      //return[null,isValid]; 
      return [null,isValid];
      
    
  }
};




module.exports = {get_cust_details,
update_address_details,
update_card_details,
signup,
login}