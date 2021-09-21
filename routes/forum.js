var express = require('express');
var router = express.Router();
var connection  = require('../config/connection')


// retrieve

router.get('/', function(req, res,) {

  connection.query("SELECT * FROM post", function(err, rows) {
    if(err) throw err;
    console.log(rows);
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



module.exports = router;