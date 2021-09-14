var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/checkrow/:pck_id', function(req, res, next) {
  /*delete selected row */
   var upidd = req.params.pck_id;
  connection.query("SELECT * FROM pickups WHERE pck_id = ?",[upidd], function(err, rows) {
    if(err) throw err;
    console.log(upidd);
    
    

  });
  
  
});

module.exports = router;