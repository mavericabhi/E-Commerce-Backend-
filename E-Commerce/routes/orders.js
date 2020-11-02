const express = require('express');
const router = express.Router();
const verify = require('./../middleware/verify');

//const utils = require('../data/utils');
const order_controller = require('../Controller/orders');

router.post('/cart/:cust',verify,order_controller.put_order);

router.post('/product/:cust',verify,order_controller.put_order_directly);

router.get('/get_order/:cust',verify,order_controller.get_order_cust_id);

router.get('/get_order_by_id/:id',order_controller.get_order_id);

module.exports=router;