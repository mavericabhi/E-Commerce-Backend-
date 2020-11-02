const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const category_controller = require('../../Controller/Category_controller');


router.get('/', category_controller.get_all_categories);


router.get('/:category_id', category_controller.get_catg_by_id);


router.get('/inProduct/:product_id', category_controller.get_catg_by_prod_id);


router.post('/', category_controller.add_catg);


module.exports = router;