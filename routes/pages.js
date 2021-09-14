const express=require('express');
const router=express.Router();

router.get('/',(req,res)=>{
    res.render('index');
});


router.get('/',(req,res)=>{
    res.render('index');
});

router.get("/bregister",(req,res)=>{
    res.render("bregister")
  });

router.get("/addproduct",(req,res)=>{
    res.render("addproduct")
  });
  
router.get("/header",(req,res)=>{
    res.render("header")
  });
   

  router.get('/fregister', (req, res) => {

    res.render("fregister");
    
});

router.get("/shoppingcart",(req,res)=>{
    res.render("shoppingcart")
  });
  
router.get("/home",(req,res)=>{
    res.render("home")
  });




  module.exports=router;
