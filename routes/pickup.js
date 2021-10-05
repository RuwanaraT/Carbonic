var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/pickupdetailstable', function(req, res, next) {
  /*Retrieve databse details to the page */
  connection.query("SELECT * FROM pickups", function(err, rows) {
    if(err) throw err;
    console.log(rows);
    res.render('pickupdetailstable', { pickupobj:rows });

  });
  
  
});

/*insert*/
router.post('/addDetails',function(req,res){
    var bid = connection.query('SELECT id FROM bdetails WHERE name = ?',req.body.bname);
    var pckdata = {
        buyername:req.body.bname,
        province:req.body.province,
        driver_mobile:req.body.mobile,
        settime:req.body.pcktime,
        setdate:req.body.pckdate,
        driver_NIC:req.body.drnic,
        vehicle_no:req.body.vcno,
        buyerid:bid,
    };
    console.log(pckdata);
    //res.send("data inserted.");
    connection.query("INSERT INTO pickups SET  ?", pckdata,function(err,result){
        if(err)throw err;
        res.send("data inserted.");
    });
    
});

/*delete*/
router.get('/deletepck/:pid', function(req, res, next) {
  /*delete selected row */
   var upid = req.params.pid;
  connection.query("DELETE FROM pickups WHERE pid = ?",[upid], function(err, rows) {
    if(err) throw err;
    console.log(upid);
    res.send("Deleted successfully!");
    

  });
  
  
})

module.exports = router;