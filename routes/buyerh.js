var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/', function(req, res, next) {

  connection.query("SELECT * FROM bdetails ", function(err, rows) {
    
    if(err) throw err;

    console.log(rows);

  res.render('buyerh', {buyer:rows});

  });
});

// const totBuyers='SELECT SUM(id) FROM bdetails'

// router.get('/',function(req,res,next){
//   connection.query(totBuyers,function(err,rows){
//     if(err) throw err;
//     console.log(totBuyers);
//     res.render('buyerh',{totBuyers:totBuyers[o].totBuyers});
//   })
// })




module.exports=router;