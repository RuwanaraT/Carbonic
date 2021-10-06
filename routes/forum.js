var express = require('express');
var router = express.Router();
var connection  = require('../config/connection');
// const Sequelize = require('sequelize');
// const Op = Sequelize.Op;




// retrieve all posts to mani page

router.get('/', function(req, res,) {

  connection.query("SELECT * FROM post", function(err, rows) {
    if(err) throw err;
    // console.log(rows);
    var rowcount = rows.length;
    res.render('forumHome', { post:rows ,rowcount });

  });
  
  
});


//add post

router.post('/addPost/:buyername',function (req,res){

  try {
    const{psubject,pdescription}=req.body;
    if( !psubject || !pdescription){
        return res.status(400).render('forumHomeLoged',{message:'Pleace Enter some value' });
      }        
  const postData={
    psubject:req.body.psubject,
    pdescription:req.body.pdescription,
    bid:req.params.buyername,


  };  
  
  connection.query("insert into post set ?", postData,function (err,result){
    if(err) throw err;
    var buyername = req.params.buyername;
    res.redirect('/forumHome/'+ buyername);
  });
  
  }catch (error) {
    console.log(error)
  }
   

});


//direct to forumpost page , comment looping without login

router.get('/forumPost/:pid/:psubject/:bid/:pdescription/:date', function(req,res){//
  
  var postid= req.params.pid;
  var postsubject=req.params.psubject;
  var postdescription= req.params.pdescription;
  var postdate= req.params.date;
  var postbid= req.params.bid;

  
 
    connection.query("SELECT * FROM comment where pid = ?",[postid], function(err, rows){
      if(err) throw err;
      var rowcount = rows.length;
      res.render('forumPost', { postid , postsubject, postbid, postdescription, postdate, rowcount,  comment:rows});//
    });
    
 
    
  
});




//add comment 


router.post('/forumPost/:pid/:psubject/:bid/:pdescription/:date',function (req,res){   //:buyername
  var postid= req.params.pid;
   console.log(postid);
  const commentData={
    comment:req.body.comments,
    pid:req.params.pid,
    //bid:req.params.buyername,
    
  };  
  
  
  connection.query("insert into comment set ?", commentData,function (err,result){
    if(err) throw err;
    var postid= req.params.pid;
    var postsubject=req.params.psubject;
    var postdescription= req.params.pdescription;
    var postdate= req.params.date;
    var postbid= req.params.bid;
    //var buyername = req.params.buyername;
    var path= postid + "/" + postsubject + "/" + postbid + "/" + postdescription + "/" + postdate ; //+ "/" + buyername
    //console.log('/forumHome/forumPost/'+path); 
    res.redirect('/forumHome/forumPost/'+path);
  });

});


//user login and pass user name 

router.post('/forumLogin/login', function(req,res){
  
  var email1 = req.body.email;
  //console.log(email1);
  try {
    const{email,password}=req.body;
    if( !email || !password){
        return res.status(400).render('forumLogin',{
          message:'Pleace Enter Email and Password'
        })
    }
  connection.query('SELECT * FROM bdetails WHERE email=?', [email], function (err,results){
  // console.log(results);
  if(results==0 || !(password==results[0].password)){
      res.status(401).render('forumLogin',{
          message:'Email or Password incorrect'
      })
  }else{
    var buyername= results[0].name; 
    //console.log(buyername); 
    res.redirect('/forumHome/'+ buyername)
  }
     
})
} catch (error) {
  console.log(error)
}
});


//  
// after login retrieve all posts to mani page

router.get('/:buyername', function(req, res,) {

  var buyername=req.params.buyername;
  connection.query("SELECT * FROM post", function(err, rows) {
    if(err) throw err;
    // console.log(rows);
    var rowcount = rows.length;
    res.render('forumHomeLoged', { post:rows , buyername ,rowcount});

  });
  
  
});

//direct to forumpost page , comment looping After login

router.get('/forumPost/:pid/:psubject/:bid/:pdescription/:date/:buyername', function(req,res){//
  
  var postid= req.params.pid;
  var postsubject=req.params.psubject;
  var postdescription= req.params.pdescription;
  var postdate= req.params.date;
  var postbid= req.params.bid;
  var buyername = req.params.buyername;

  
 
    connection.query("SELECT * FROM comment where pid = ?",[postid], function(err, rows){
      if(err) throw err;
      var rowcount = rows.length;
      res.render('forumPost', { postid , postsubject, postbid, postdescription, postdate, buyername, rowcount, comment:rows});//
    });
    
 
    
  
});

//forum user page data retreve part

router.get('/forumUser/:buyername', function(req, res,) {
  //console.log("i am workig ");
  var buyername=req.params.buyername;
  
  //console.log(buyername);
  connection.query("SELECT * FROM post where bid =? ",[buyername], function(err, rows) {
    if(err) throw err;
    console.log(rows.length);
    var rowcount = rows.length;
    res.render('forumUser', { post:rows , buyername , rowcount});

  });
   
});

// delete post 

  
router.get('/deletePost/:pid/:bid', function(req, res){
    
    //console.log("i am working");
    var postid = req.params.pid;
    //console.log(postid);
    connection.query("DELETE FROM post where pid = ? ", [postid] , function(err, result){
      if (err) throw err;
      var buyername= req.params.bid;
      //console.log(buyername);
      
      res.redirect('/forumHome/forumUser/'+ buyername);
    });

});


// update post get data from post pass in to update form

  
router.get('/updatePost/:pid/:bid', function(req, res){
    
  //console.log("i am working");
  var postid = req.params.pid;
  //console.log(postid);
  connection.query("SELECT * FROM post where pid = ?", [postid] , function(err, rows){
    if (err) throw err;
    var buyername= req.params.bid;
    //console.log(buyername);
    res.render('forumUpdate', { post:rows , buyername});
    
  });      
  
});


// do the updating and direct to forumUser

router.post('/updateNow/:pid/:bid',function (req,res){

  
    var psubject=req.body.psubject;
    var pdescription=req.body.pdescription;
    
    var pid=req.params.pid;


  
  connection.query("update post set psubject=? , pdescription=? where pid=?",[psubject,pdescription,pid],function (err,result){
    if(err) throw err;
    var buyername = req.params.bid;
    res.redirect('/forumHome/forumUser/'+ buyername);
  });
  
   

});

// search part
router.post('/search/:buyername', function(req, res){
    
  console.log("i am working");
  var searchContend = req.body.search;
  console.log(searchContend);
  var buyername= req.params.buyername;
  
  connection.query("SELECT * FROM post where bid = ?", [searchContend] , function(err, rows){
    if (err) throw err;
    
    //console.log(buyername);
    var rowcount = rows.length;
    if(rowcount==0){
      res.render('forumHomeLoged', { message:"no item",buyername }); 
    }else{
      
      res.render('forumHomeLoged', { post:rows , buyername ,rowcount});
    }
  });      

});

 //report genarating part
 
 router.get('/forumReport/forumReport', function(req, res,) {

  // connection.query("SELECT * FROM post", function(err, rows) {
  //   if(err) throw err;
  //   // console.log(rows);, { post:rows ,rowcount }
  //   var rowcount = rows.length;
  
//});

res.render('forumReport');
  
});
  






module.exports = router;