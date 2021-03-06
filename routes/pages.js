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

//  router.get("/pmviewproduct",(req,res)=>{
//     res.render("pmviewproduct")
//   });
  


  router.get("/1st",(req,res)=>{ //h
   res.render("1st")
  });

  // router.get("/",(req,res)=>{          //h
  //   res.render("2nd")
  // });

  router.get("/forumHome/forumUser",(req,res)=>{
   res.render("forumUser")
  });

  router.get("/forumHome/forumLogin",(req,res)=>{
    res.render("forumLogin")
   });


  router.get("/",(req,res)=>{            //h
    res.render("forumHome")
  });

  // router.get("/forumpost",(req,res)=>{            //h
  //   res.render("forumPost")
  // });



 


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


router.get("/shoppingcart",(req,res)=>{
    res.render("shoppingcart")
  });
  
router.get("/home",(req,res)=>{
    res.render("home")
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
// router.get('/editbuyer', (req, res) => {

//   res.render("editbuyer");
  
// });
router.get('/buyerDashboard', (req, res) => {
  if(req.buyer) {

    res.render("buyerDashboard", {
        user : req.user
    });
}
});

router.get('/alogin', (req, res) => {

res.render("alogin");

});


router.get("/pickupform",(req,res)=>{
  res.render("pickupform");
});//ir

router.get("/pickupcancel",(req,res)=>{
  res.render("pickupcancel");
});//ir

router.get("/pickupdetailstable",(req,res)=>{
  res.render("pickupdetailstable");
});//ir

router.get("/requests",(req,res)=>{
  res.render("requests");
});//ir

router.get('/', (req, res) => {
  res.render("buyerh");
  
});

router.get('/feedback', (req, res) => {

  res.render("feedback");
  
  });
  
  router.get('/invoilist', (req, res) => {

    res.render("invoilist");
    
    });
    router.get('/invoicetemplate', (req, res) => {

      res.render("invoicetemplate");
      
      });
    
      router.get('/receipt', (req, res) => {

        res.render("receipt");
        
        });
        router.get('/pdf', (req, res) => {


          res.render("pdf");
          
          });

  router.get('/freport', (req, res) => {

    res.render("freport");
    
    });




  module.exports=router;
