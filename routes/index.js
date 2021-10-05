var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')

/* GET home page. */
router.get('/', function(req, res, next) {

  // sample query //

  /*connection.query("SELECT * FROM producers", function(err, rows) {
    if(err) throw err;
    console.log(rows);
    res.render('index', { producers:rows });

  });*/
  res.render('index', { title: 'Welcome' });
  
});


module.exports = router;
