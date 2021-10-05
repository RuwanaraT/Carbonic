const express = require("express");
const fhandController = require("../controllers/fhand");
const mysql = require("mysql");

const router = express.Router();

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database : 'carbonic'

    
 });


router.post('/fregister', fhandController.fregister)

router.post('/login', fhandController.login);

router.get('/logout', fhandController.logout);

router.post('/resetpassword', fhandController.resetpassword);


// route for update fprofile
router.post('/fprofile/:id', function(req, res) {

    var fname = req.body.fname;
    var fnic = req.body.fnic;
    var fmobile = req.body.fmobile;
    var fadline1 = req.body.fadline1;
    var fadline2 = req.body.fadline2;
    var fprovince = req.body.fprovince;
    var fdistrict = req.body.fdistrict;
    var fpcode = req.body.fpcode;
    var femail = req.body.femail;

    var fid = req.params.id;

    db.query("UPDATE farmers SET fname = ?, fnic = ?, fmobile = ?, fadline1 = ?, fadline2 = ?, fprovince = ?, fdistrict = ?, fpcode = ?, femail = ? WHERE id = ?", [fname, fnic, fmobile, fadline1, fadline2, fprovince, fdistrict, fpcode, femail, fid], function(err, result) {

      if(err) throw err;
      res.redirect('/fprofile');
    })

  })

  //route for retrieve data from farmer table to the fdelete page
  // router.get('/getsingleuser/:id', function(req, res) {

  //   var fid = req.params.id;

  //   db.query("SELECT * FROM farmers WHERE id = ?", [fid], function(err, rows) {

  //     if(err) throw err;
  //     res.render("fdelete", {userdata : rows});

  //   })

    
  // })

 // route for delete single farmer
 router.get('/fdelete/:id', function(req, res) {

  var fid = req.params.id;

  db.query("DELETE FROM farmers WHERE id = ?", [fid], function(err, results) {

    if(err) throw err;
    res.redirect('/');
  })

 })


 // route for retrieve buyers from buyer table
 router.get('/searchforbuyers', function(req, res, next) {

  db.query('SELECT * FROM bdetails', function (err, rows) {

    if(err) throw err;

    console.log(rows);

    res.render('searchforbuyers', {buyers:rows} );

  });

 
});


 // route for retrieve farmers from farmer table
 router.get('/freport', function(req, res, next) {

  db.query('SELECT * FROM farmers', function (err, rows) {

    if(err) throw err;

    console.log(rows);

    res.render('freport', {farmers:rows} );

  });

 
});


module.exports = router;