var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/pmviewproduct', function(req, res, next) {

  connection.query("SELECT * FROM product", function(err, rows) {
    
    if(err) throw err;

    console.log(rows);

    res.render('pmviewproduct', {product:rows});

  });
  
// res.render('index',{title: 'Welcome'});
});

router.post('/addproduct', function(req, res, next) {

    const productdata ={
      fid:req.body.fid,
      pid:req.body.pid,
      pname:req.body.pname,
      ptype:req.body.ptype,
      expdate:req.body.expdate,
      qty:req.body.qty,
      pricepu:req.body.pricepu,
      pdesc:req.body.pdesc,
    //   prod_image:req.body.prod_image,
      

    };

    // console.log(productdata);
    // res.send("Data sent");

    connection.query("INSERT INTO product SET ?", productdata, function(err,result){

        if(err) throw err;
        res.redirect('/'); 
      });
    
    
  });

module.exports = router;