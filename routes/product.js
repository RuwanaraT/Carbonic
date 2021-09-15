var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


router.get('/', function(req, res, next) {

  connection.query("SELECT * FROM product", function(err, rows) {
    
    if(err) throw err;

    console.log(rows);

    res.render('pmviewproduct', {product:rows});//sent to pmviewproduct.hbs

  });
  
// res.render('index',{title: 'Welcome'});
});

router.post('/addproduct', function(req, res, next) {

    const productdata ={
      fid:req.body.fid,
      // pid:req.body.pid,
      pname:req.body.pname,
      ptype:req.body.ptype,
      expdate:req.body.expdate,
      qty:req.body.qty,
      pricepu:req.body.pricepu,
      pdesc:req.body.pdesc,
    //   prod_image:req.body.prod_image,
      

    };

    // console.log(productdata);
    // res.send("Data sent");

    connection.query("INSERT INTO product SET ?", productdata, function(err,result){

        if(err) throw err;
        res.redirect('pmviewproduct'); 
      });
    
    
  });

//   Update Query
router.get('/prdupdate/:pid',function(req,res){

    var updatepid = req.params.pid;

    connection.query("SELECT * FROM product WHERE pid = ?",[updatepid], function(err,rows){

      if(err) throw err;

      res.render('prdupdate', {product:rows});
    })

});

router.post('/updateproduct/:pid', function(req,res){

    // var updatepid = req.body.pid;
    var pname=req.body.pname;
    var expdate = req.body.expdate;
    var qty = req.body.qty;
    var pricepu = req.body.pricepu;
    var pdesc = req.body.pdesc;

    // var fname = req.body.fname;// this--> req.body.'fname' is the name tag in the edit file
    // var lname = req.body.lname;
    // var email = req.body.email;
    // var prof = req.body.prof;
    
    var updateId = req.params.pid; //to identify which record should be updated

    connection.query("UPDATE product SET pname=?,expdate=?,qty=?,pricepu=?,pdesc=? WHERE pid=?",[pname,expdate,qty,pricepu,pdesc,updateId], function(err,respond){
      if(err) throw err;

      res.redirect('/pmviewproduct')//else ridirect to 2k piitipassata

    });

})

router.get('/deleteProduct/:pid', function(req,res){

    var deleteid = req.params.pid;

    // console.log(deleteid);
    // res.send("id recieved")

    connection.query("DELETE FROM product WHERE pid = ?", [deleteid], function(err,rows){
     
      if(err) throw err;

      res.redirect('/pmviewproduct')//to redirect to the same pageafter deletion
    })
});


module.exports = router;