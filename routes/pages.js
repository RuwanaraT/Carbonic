const express=require('express');
const authController=require('../controllers/auth');
const fhandController = require('../controllers/fhand');
const router=express.Router();


// router.get('/',(req,res)=>{
//     res.render('index');
// });


router.get('/', fhandController.isLoggedIn, (req,res)=>{

    res.render('index', {
      user : req.user
    });

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
  

  router.get("/1st",(req,res)=>{ //h
   res.render("1st")
  });

  // router.get("/",(req,res)=>{          //h
  //   res.render("2nd")
  // });

  router.get("/",(req,res)=>{            //h
    res.render("forumHome")
  });

  router.get("/forumpost",(req,res)=>{            //h
    res.render("forumPost")
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




router.get('/login', (req, res) => {

  res.render("login");
  
});


router.get('/fprofile', fhandController.isLoggedIn, (req, res) => {

  if(req.user) {

      res.render("fprofile", {
          user : req.user
      });
  }else {
      res.redirect('/login');
  }
  
  
});

router.get('/searchforbuyers', (req, res) => {

  res.render("searchforbuyers");

  
});

router.get('/resetpassword', (req, res) => {

  res.render("resetpassword");
  
});

router.get('/fdelete', (req, res) => {

  res.render("fdelete");
  
});

router.get('/prdupdate', (req, res) => {

  res.render("prdupdate");
  
});


  module.exports=router;
