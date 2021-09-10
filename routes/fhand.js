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



module.exports = router;