const models = require('../data/db');
const order_services = require('../Services/orders');
const {to} = require('await-to-js');
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');


const put_order = async (req, res, next) => {
    
  //let cust = req.body.cust_name;
  let cust_id=req.params.cust;
  let order_id=req.body.id;
  //console.log(cust);
  //console.log(email);
  //console.log(password);
  let [errr,result] = await to(order_services.put_order_from_cart(order_id));

  if(!result)
      return res.json({data: null, error: errr});

  return res.json("Order Placed SUCCESSFULLY")
  } 


  const update_credit = async (req, res, next) => {
    
    let credit = req.body.credit;
    let cust=req.params.cust;
    
    let [err, result] = await to(customers_services.update_card_details(cust,credit));
  
    if(!result)
        return res.json({data: null, error: err});
  
    return res.json({ data: 'CARD DETAILS UPDATED SUCCESSFULLY!!',error:null});
  }
  const update_address = async (req, res, next) => {
    
    let address = req.body.address;
    let cust=req.params.cust;
    
    let [err, result] = await to(customers_services.update_address_details(cust,address));
  
    if(!result)
        return res.json({data: null, error: err});
  
        return res.json({ data: 'ADDRESS UPDATED SUCCESSFULLY!!',error:null});}





//Next api started from here kindly dont mix it,THANKYOU





    const put_order_directly = async (req, res, next) => {
    
        //let cust = req.body.cust_name;
        let cust_id=req.params.cust;
        let product_id=req.body.id;
        let quantity=req.body.quantity;
        //console.log(cust);
        //console.log(email);
        //console.log(password);
        let [errr,result] = await to(order_services.put_order_from_product(product_id,cust_id,quantity));
      
        if(!result)
            return res.json({data: null, error: errr});
      
        return res.json("Order Placed SUCCESSFULLY")
        }
        
        
    const get_order_cust_id = async (req, res, next) => {
    
            //let cust = req.body.cust_name;
            let cust_id=req.params.cust;
            //console.log(cust);
            //console.log(email);
            //console.log(password);
            let [errr,result] = await to(order_services.get_order_cust_id(cust_id));
          
            if(!result)
                return res.json({data: null, error: errr});
          
            return res.json({data:result,error:null})
            } 

    const get_order_id = async (req, res, next) => {
    
                //let cust = req.body.cust_name;
                let id=req.params.id;
                //console.log(cust);
                //console.log(email);
                //console.log(password);
                let [errr,result] = await to(order_services.get_order_id(id));
              
                if(!result)
                    return res.json({data: null, error: errr});
              
                return res.json({data:result,error:null})
                } 
      
      
       
  
module.exports={
  put_order,
  put_order_directly,
  get_order_cust_id,
  get_order_id
  
}