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


/*Retrive report details to hbs*/
router.get('/checked/:pid',function(req,res,next){
   var idr = req.params.pid;
  connection.query("SELECT pid,buyername,province,settime,setdate,vehicle_no FROM pickups WHERE pid= ?",[idr],function(err,rows){
    if(err) throw err;
    console.log(idr);
    res.render('pickupReport',{ dispatchobj:rows });
   /* res.send("Data passed.");*/
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
    var onerow = connection.query("INSERT INTO pickups SET  ?", pckdata,function(err,result){
        if(err)throw err;
        //res.send("data inserted.");
        res.render("insertSuccess");
        
    });
    
});

/*delete*/
router.get('/deletepck/:pid', function(req, res, next) {
  /*delete selected row */
   var upid = req.params.pid;
  connection.query("DELETE FROM pickups WHERE pid = ?",[upid], function(err, rows) {
    if(err) throw err;
    console.log(upid);
    res.render("deletedSucess");
    

  });
  
  
});

/*Update pickup details*/
router.get('/edit/:pid',function(req,res,next){
  var updateData = req.params.pid;
  /*getting record belongs to pid*/
  connection.query('SELECT * FROM pickups WHERE pid=?',[updateData],function(err,rows){
    if(err) throw err;
    console.log(updateData);
    res.render('pickupupdate',{updatePckData:rows});//pass data set to hbs
  });
});

module.exports = router;