const express=require('express');
const authController=require('../controllers/auth');

const router=express.Router();
const mysql = require("mysql");


const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "carbonic"
  });



// router.post('/updatebuyer',function(req,res){
//    // console.log(req.body);
//     const name=req.body.name;
//     const email=req.body.email;

//     const address=req.body.address;
//     const contactNumber=req.body.contactNumber;
//    var Updateid=req.body.id;
// db.query("UPDATE bdetails SET name=?,email=?,address=?,contactNumber=? WHERE id=?",[name,email,address,contactNumber,Updateid],function(err,results){
//     if(err) throw err;
//     console.log(err);
//     res.redirect('../../')

// })
// });
     router.get('/', function(req, res, next) {

     db.query("SELECT * FROM bdetails", function(err, rows) {
      
      if(err) throw err;
  
      console.log(rows);
  
      res.render('buyerhandler', {buye:rows});//sent to pmviewproduct.hbs
  
    });
});



module.exports=router;