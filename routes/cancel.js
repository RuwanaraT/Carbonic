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

router.post('/addCancel',function(req,res){
    var reqdata = {
      pck_date:req.body.pcdate,
      reason:req.body.message,
      pck_id:req.body.ppid,
    };
    console.log(reqdata);
    connection.query("INSERT INTO requests SET  ?", reqdata,function(err,result){
        if(err)throw err;
        res.send("data inserted.");
    });
    
});



module.exports = router;