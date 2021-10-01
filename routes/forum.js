var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


// retrieve

router.get('/', function(req, res,) {

  connection.query("SELECT * FROM post", function(err, rows) {
    if(err) throw err;
    // console.log(rows);
    res.render('forumHome', { post:rows });

  });
  
  
});

//insert

router.post('/addPost',function (req,res){

  const postData={
    psubject:req.body.psubject,
    pdescription:req.body.pdescription,


  };  
  // console.log(postData);
  
  connection.query("insert into post set ?", postData,function (err,result){
    if(err) throw err;
    res.redirect('/forumHome')
  })
  
   

});


//direct to commet page 

router.get('/forumPost/:pid', function(req,res){
  
  var postid= req.params.pid;

  const post1=connection.query("SELECT * FROM post where pid = ?",[postid], function(err, rows) {
    if(err) throw err;
    res.render('forumPost', { post:rows });// edit 
  
  });
  
  const comment1=connection.query("SELECT * FROM comment where pid = ?",[postid], function(err, rows){
    if(err) throw err;
    console.log(rows);
    // res.render('forumPost', { comment:rows });
  })
  
    
  
});


//add comment insert


router.post('/forumPost/:pid',function (req,res){

  // console.log(postid);
  const commentData={
    comment:req.body.comments,
    pid:req.params.pid,
    
  };  
  console.log(commentData);
  
  connection.query("insert into comment set ?", commentData,function (err,result){
    if(err) throw err;
    var postid= req.params.pid;
    // var p=postid.concat('"')
    // var url='"/forumHome/forumPost/';
    // var redirectUrl=url.concat(p);
    //  console.log('/forumHome/forumPost/'+ postid); 
    res.redirect('/forumHome/forumPost/'+ postid);
  });

});


//derect to user page

//delete psot

// router.get('/forumDelete/:pid', function(req,res){
  
//   var postid= req.params.pid;

//   connection.query("delete * FROM post where pid = ?",[postid], function(err, rows) {
//     if(err) throw err;
//     res.redirect('/forumHome');// edit 
  
//   });
     
  
// });










module.exports = router;