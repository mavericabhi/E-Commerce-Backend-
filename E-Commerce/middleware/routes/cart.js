const express = require('express');
const router = express.Router();

//const utils = require('../data/utils');
const cart_controller = require('../Controller/cart_controller');



router.get('/:cust_id',cart_controller.get_prod_in_cart );


router.get('/totalAmount',cart_controller.total_amt_of_cart );


router.post('/:cust_id',cart_controller.add_to_cart );


router.put('/update/:cust_id',cart_controller.update_prod_qty_in_cart );


router.delete('/empty/:cust',cart_controller.empty_cart);


router.delete('/removeProduct/:cust_id',cart_controller.remove_a_prod_from_cart);



module.exports = router;