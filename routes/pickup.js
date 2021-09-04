var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/', function(req, res, next) {

  connection.query("SELECT * FROM pickups", function(err, rows) {
    if(err) throw err;
    console.log(rows);
    res.render('pickupdetailstable', { pickupobj:rows });

  });
  
  
});

module.exports = router;