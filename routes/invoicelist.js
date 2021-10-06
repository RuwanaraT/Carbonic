var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')

router.get('/invoicelist', function(req, res, next) {
    /*Retrieve databse details to the page */
    connection.query("SELECT * FROM invoice2", function(err, rows) {
      if(err) throw err;
      console.log(rows);
      res.render('invoicelist', { invoice2:rows });
  
    });
    
    
  });
  
  /*insert*/
  router.post('/addDetails',function(req,res){
      var iid = connection.query('SELECT id FROM invoice2 WHERE name = ?',req.body.bname);
      var invdata = {
          invoiceid:req.body.iid,
          buyeremail:req.body.bmail,
          due_date:req.body.date,
         sub_total:req.body.sutol,
          order_status:req.body.odrst,
          
      };
  
      console.log(invdata);
      //res.send("data inserted.");
      connection.query("INSERT INTO invoice2 SET  ?", invdata,function(err,result){
          if(err)throw err;
          res.send("data inserted.");
      });
      
  });
  
  /*delete*/
  router.get('/deleteinv/:invoiceid', function(req, res, next) {
    /*delete selected row */
     var invoiceid = req.params.invoiveid;
    connection.query("DELETE FROM invoice2 WHERE invoiceid = ?",[invoiceid], function(err, rows) {
      if(err) throw err;
      console.log(invoiceid);
      res.send("Deleted successfully!");
      
  
    });
    
    
  })




module.exports=router;