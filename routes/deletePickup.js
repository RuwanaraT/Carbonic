var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/deletepck/:pid', function(req, res, next) {
  /*delete selected row */
   var upid = req.params.pid;
  connection.query("DELETE FROM pickups WHERE pid = ?",[upid], function(err, rows) {
    if(err) throw err;
    console.log(upid);
    res.redirect('/pickupdetailstable');
    

  });
  
  
});

module.exports = router;