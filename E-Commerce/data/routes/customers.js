/* 

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
    }res.json({
        token: generateToken(cust.encryptedPassword, salt)
    return passwordHash;
};

app.post('/signup', async function (req, res) {
    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    if(!name || !email ||!password){
        return res.status(400).send({ error: "Invalid Payload" });
    }

    let [err, result] = await to( mysql.Customers.findAll());
    var customer_id = result.length+1;
   
    [err, result] = await to ( mysql.Customers.findAll({
        where: {
            cname: name
        }
    }) )
     var student = result[0];
    if(student){
        return res.status(400).send({ data: null, error: `This username already exist` });
    } 
    
    let encryptedPassword = await  passwordHash(password);
    [err, result] = await to(
        mysql.Customers.create({
          name,email, encryptedPassword
    }) )
    if(!err){
        res.json({
            "msg": "Sign up successful"
        });
    } else{
        return res.json({"data":null, "error": err})
    }
});

app.post('/login', async function (req, res) {
    let email = req.body.email;
    let password = req.body.password;
    let name=req.body.name;

    if(!email){
        return res.json({"error": "email is required "})
    }
    if(!password){
        return res.json({"error": "Password is required "})
    }

    let [err, result] = await to(mysql.Customers.findAll({
        where:{
            email: email
        }
    }) )
    let cust = result[0];
    if(cust == null){
        return res.json({
        "error": "Incorrect email"
        });
    }
    
    let [error, isValid] = await to(
        bcrypt.compare(password, cust.encryptedPassword)
    );
    if(!isValid){
        return res.status(400).json({ "error": "Incorrect Password"});
    }
    else{
        return res.json({
            token: generateToken(cust.encryptedPassword, salt)
        }) 
    }
});
 app.get("/" ,verify, async(req, res) => {
    let [err, result] = await to( mysql.Customers.findAll())
    if (err){
      return res.json({"Data":null, "Error": err});
    }
    else{
      return res.json({result});
    }
  });  
  
  
  app.get("/:id",verify,async(req,res)=>{
    let[err,result]=await to(mysql.Customers.findAll({
    where:{
      id:req.params.id
    }}));
    if(err){
      res.json("ERR:SORRY NOT FOUND");
    }
    else{
      res.json({result});
    }
  });
  
  app.put("/:id/Address",verify, async(req,res)=>{
    try {
      const result = await to(mysql.Customers.update(
        { Address: req.body.Address },
        { where: { id: req.params.id } }
      ));
      res.json(result);
      }
       catch (err) {
      res.json("ERROR");
    }
  
  });
  app.put("/:id/Credit",verify, async(req,res)=>{
    try {
      const result = await to(mysql.Customers.update(
        { Address: req.body.Credit },
        { where: { id: req.params.id } }
      ));
      res.json(result);
      }
       catch (err) {
      res.json("ERROR");
    }
  
  }); */
  
//module.exports = app;

const express = require('express');
const router = express.Router();

//const utils = require('../data/utils');
const customer_controller = require('../../Controller/customers_controller');




router.post('/Signup',customer_controller.sign_up);
router.post('/login',customer_controller.login);
router.post('/credit/:cust',customer_controller.);


/* router.get('/totalAmount',cart_controller.total_amt_of_cart );


router.post('/:cust_id',cart_controller.add_to_cart );


router.put('/update/:cust_id',cart_controller.update_prod_qty_in_cart );


router.delete('/empty/:cust',cart_controller.empty_cart);


router.delete('/removeProduct/:cust_id',cart_controller.remove_a_prod_from_cart); */



module.exports = router;

