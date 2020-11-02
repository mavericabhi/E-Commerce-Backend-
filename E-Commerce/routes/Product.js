const express = require('express');
const router = express.Router();


const product_controller = require('../Controller/Product_controller');

//GET ALL THE PRODUCTS
router.get('/',product_controller.get_all_products );

//GET PRODUCT BY ID
router.get('/:product_id', product_controller.get_prod_by_id);

//GET PRODUCT BY ITS NAME
router.get('/search', product_controller.search_prod_by_name );

//GET PRODUCTS OF PARTICULAR CATEGORY
router.get('/inCategory/:category_id', product_controller.get_prod_in_catg_id );


//router.get('/:product_id/reviews', product_controller.get_all_reviews);


//router.post('/:product_id/reviews', product_controller.add_review );


module.exports = router;