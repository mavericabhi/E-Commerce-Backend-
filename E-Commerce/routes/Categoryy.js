const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const category_controller = require('../Controller/Category_controller');

//GET ALL CATEGORIES
router.get('/', category_controller.get_all_categories);

//GET CATEGORY BY ID
router.get('/:category_id', category_controller.get_catg_by_id);

//GET CATEGORY OF A PARTICULAR PRODUCT
router.get('/inProduct/:product_id', category_controller.get_catg_by_prod_id);

//ADD CATEGORY
router.post('/', category_controller.add_catg);


module.exports = router;