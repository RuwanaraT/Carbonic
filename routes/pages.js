const express=require('express');
const authController=require('../controllers/auth');
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

  router.get("/blogin",(req,res)=>{
    res.render("blogin")
  });

router.get("/addproduct",(req,res)=>{
    res.render("addproduct")
  });

 router.get("/pmviewproduct",(req,res)=>{
    res.render("pmviewproduct")
  });
  
router.get("/header",(req,res)=>{
    res.render("header")
  });

  router.get("/addforum",(req,res)=>{
    res.render("addforum")
  });

  router.get("/bprofile",authController.isLoggedIn, (req,res)=>{
    if(req.buyer){
     
    res.render("bprofile",{
      buyer:req.buyer
    })

    }else{
      res.redirect('/blogin"');
    }
  });
   

  router.get('/fregister', (req, res) => {

    res.render("fregister");
    
});
router.get('/contactus', (req, res) => {

  res.render("contactus");
  
});

  





  module.exports=router;
