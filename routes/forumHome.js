var express = require('express');
var router = express.Router();
var connection  = require('../config/connection');
const mysql = require("mysql");


const db = mysql.createConnection({



  host: 'localhost',

  user: 'root',

  password: '',

  database : 'carbonic'



  

});

router.get('/forumHome', function(req, res) {

  db.query("SELECT * FROM post", function(err, rows) {
    if(err) throw err;
    console.log(rows);
    res.render('forumHome', { post:rows });
    
  });
  
  
});

// router.get('/forumHome', function(req, res){
//       res.render('forumHome', {x:'welcome'})
// });

module.exports = router;