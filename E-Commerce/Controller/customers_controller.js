const models = require('../data/db');
const customers_services = require('../Services/customers');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');




  
let salt = 'mysalt';
const generateToken = (Password, salt) => {
  
      let token = jwt.sign(Password, salt);
      return token;
  }
 
 
const sign_up = async (req, res, next) => {
    
  let cust = req.body.cust_name;
  let email=req.body.email;
  let password=req.body.password;
  console.log(cust);
  console.log(email);
  console.log(password);
  let [err, sign] = await to(customers_services.signup(cust,email,password));

  if(!sign)
      return res.json({data: null, error: err});

  return res.json({ data: 'SIGNED UP SUCCESSFULLY!!',error:null});
}

/* let salt = 'mysalt';
const generateToken = (password, salt) => {

    let token = jwt.sign(password, salt);
    return token;
} */

const login = async (req, res, next) => {
    
  //let cust = req.body.cust_name;
  let mail=req.body.email;
  let Password=req.body.password;
  //console.log(cust);
  //console.log(email);
  //console.log(password);
  let [errr, signn] = await to(customers_services.login(mail,Password));

  if(!signn)
      return res.json({data: null, error: errr});

  let [err, result] = await to(models.Customers.findAll({
        where:{
            email: mail
        }
    }) )
  let cust = result[0];
  
      //return res.json("done");
    return res.json({
        token: generateToken(cust.encryptedPassword, salt)
      })
  } 


  const update_credit = async (req, res, next) => {
    
    let credit = req.body.credit;
    let cust=req.params.cust;
    
    let [err, result] = await to(customers_services.update_card_details(cust,credit));
  
    if(!result)
        return res.json({data: null, error: err});
  
    return res.json({ data: 'CARD DETAILS UPDATED SUCCESSFULLY!!',error:null});
  }
  const update_address = async (req, res, next) => {
    
    let address = req.body.address;
    let cust=req.params.cust;
    
    let [err, result] = await to(customers_services.update_address_details(cust,address));
  
    if(!result)
        return res.json({data: null, error: err});
  
    return res.json({ data: 'ADDRESS UPDATED SUCCESSFULLY!!',error:null});}
  
module.exports={
  sign_up,
  login,
  update_credit,
  update_address
}