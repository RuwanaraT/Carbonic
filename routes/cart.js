var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/cart', function(req, res, next) {

  connection.query("SELECT * FROM products", function(err, rows) {
    if(err) throw err;
    console.log(rows);
    res.render('cart', { products:rows });

  });
  
  
});

module.exports = router;