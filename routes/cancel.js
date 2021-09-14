var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/requests', function(req, res, next) {
  /*Retrieve databse details to the page */
  connection.query("SELECT * FROM requests", function(err, rows) {
    if(err) throw err;
    console.log(rows);
    res.render('requests', { reqcancel:rows });

  });
  
  
});



module.exports = router;