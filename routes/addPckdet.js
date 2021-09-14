var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.post('/addDetails',function(req,res){
    const pckdata = {
        buyername:req.body.bname,
        province:req.body.province,
        driver_mobile:req.body.mobile,
        settime:req.body.pcktime,
        setdate:req.body.pckdate,
        driver_NIC:req.body.drnic,
        vehicle_no:req.body.vcno
    };
    console.log(pckdata);
    connection.query("INSERT INTO pickups SET ?", pckdata,function(err,result){
        if(err)throw err;
        res.redirect('/');
    });
    
});

module.exports = router;