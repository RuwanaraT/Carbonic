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

  router.get("/addforum",(req,res)=>{
    res.render("addforum")
  });
   

  router.get('/fregister', (req, res) => {

    res.render("fregister");
    
});
  





  module.exports=router;
