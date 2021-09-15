const express=require('express');
const authController=require('../controllers/auth');

const router=express.Router();
const mysql = require("mysql");

router.post('/bregister',authController.bregister);
router.post('/blogin',authController.blogin);
router.post('/contact',authController.contact);
router.get('/deleteBuyer/:id',authController.deleteBuyer);
router.get('/editbuyer/:id',authController.editbuyer);
router.post('/updatebuyer',authController.updatebuyer);
router.get('/blogout',authController.blogout);

// const db=mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database: "carbonic"
//   });



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




module.exports=router;