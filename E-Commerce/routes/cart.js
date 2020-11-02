const express = require('express');
const router = express.Router();
const verify = require('./../middleware/verify');

//const utils = require('../data/utils');
const cart_controller = require('../Controller/cart_controller');


//GET THE PRODUCTS IN A CART
router.get('/:cust_id',verify,cart_controller.get_prod_in_cart );

//TOTAL AMOUNT OF A PARTICULAR
router.get('/totalAmount',cart_controller.total_amt_of_cart );

//ADD PRODUCT TO A CART
router.post('/:cust_id',verify,cart_controller.add_to_cart );

//UPDATE PRODUCT QUANTITY IN A CART
router.put('/update/:cust_id',verify,cart_controller.update_prod_qty_in_cart );

//DELETE PRODUCT FROM THE CART
router.delete('/empty/:cust',verify,cart_controller.empty_cart);


router.delete('/removeProduct/:cust_id',verify,cart_controller.remove_a_prod_from_cart);



module.exports = router;