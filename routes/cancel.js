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

/*insert requests */
router.post('/addCancel',function(req,res){
  var ppcid = connection.query('SELECT pid FROM pickups WHERE setdate = ?',req.body.pcdate);
    var reqdata = {
      pck_date:req.body.pcdate,
      reason:req.body.message,
     
    };
    console.log(reqdata);
    connection.query("INSERT INTO requests SET  ?", reqdata,function(err,result){
        if(err)throw err;
        res.send("data inserted.");
    });
    
});



module.exports = router;