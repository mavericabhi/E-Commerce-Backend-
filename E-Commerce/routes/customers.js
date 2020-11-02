const express = require('express');
const router = express.Router();
const verify = require('./../middleware/verify');

//const utils = require('../data/utils');
const customer_controller = require('../Controller/customers_controller');



//SIGN UP
router.post('/Signup',customer_controller.sign_up);

//LOGIN
router.post('/login',customer_controller.login);

//UPDATE CREDIT CARD DETAILS
router.put('/credit/:cust',verify,customer_controller.update_credit);

//UPDATE ADDRESS
router.put('/address/:cust',verify,customer_controller.update_address);




module.exports = router;

