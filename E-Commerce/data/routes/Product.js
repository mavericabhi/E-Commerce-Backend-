const express = require('express');
const router = express.Router();

//const utils = require('../data/utils');
//const middlwr_caching = require('../data/middlewares/caching_functions');
const product_controller = require('../../Controller/Product_controller');


router.get('/',product_controller.get_all_products );


router.get('/:product_id', product_controller.get_prod_by_id);


//router.post('/:category_id', product_controller.add_product ); 


router.get('/search', product_controller.search_prod_by_name );


router.get('/inCategory/:category_id', product_controller.get_prod_in_catg_id );


//router.get('/:product_id/reviews', product_controller.get_all_reviews);


//router.post('/:product_id/reviews', product_controller.add_review );


module.exports = router;