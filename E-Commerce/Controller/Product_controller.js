const { to } = require('await-to-js');
const models = require('../data/db');

const product_services = require('../Services/Product');



const get_all_products = async (req, res, next) => {
    let [err, serv] = await to(product_services.get_all_products());

    if(err)
        return res.json({data: null, error: err});
    let [error, PRODUCTS] = serv;

    if(error)
        return res.json({data: null, error });

    let PROD = JSON.stringify( PRODUCTS, null, 0);
    
    return res.json({ data: PRODUCTS, error});
}


const get_prod_by_id = async (req, res, next) => {
    let prod_id = req.params.product_id;

    let [err, serv] = await to(product_services.get_prod_by_id(prod_id) );

    if(err)
        return res.json({data: null, error: err});
    let [error, data] = serv;

    if(error)
        return res.json({data: null, error });
    
    return res.json({ data, error});
}




const search_prod_by_name = async (req, res, next) => {
    let prod_name = req.body.name;

    let [err, PRODUCTS] = await to(models.productModel.findAll(
        {   attributes: {exclude: ['createdAt', 'updatedAt']} ,
            where: {
            
            name: {
                [Sequelize.Op.like]: `%${prod_name}%`
            } 
            }
        }
    ));

    if(err)
        return res.json({data: null, error: err});

    if( PRODUCTS.length == 0 )
        return res.json({ data: null, error: "No product found with this name !"});

    return res.json({ data: PRODUCTS, error: null});
}


const get_prod_in_catg_id = async (req, res, next) => {
    let cat_id = req.params.category_id;

    let [err, serv] = await to(product_services.get_prods_in_cat_id(cat_id) );
    if(err)
        return res.json({data: null, error: err});


    let [error, PRODUCTS] = serv;
    if(error)
        return res.json({data: null, error });

    return res.json({ data:PRODUCTS, error: null});
}







// --------------------------------------------------------Exports---------------------------------------------------------------
module.exports = {
    get_all_products,
    get_prod_by_id,
    search_prod_by_name,
    get_prod_in_catg_id
   // get_all_reviews    //add_review
}