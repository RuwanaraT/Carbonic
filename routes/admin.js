var express = require('express');
const app = require('../app');
var router = express.Router();
var connection  = require('../config/connection')




//view feedback list
router.get('/delfeedback', function(req, res, next) {

  connection.query("SELECT * FROM feedback", function (err,rows) {

      if (err) throw err;

      console.log(rows);

      res.render('delfeedback', {feedback:rows});

  });

});




//insert feedback
router.post ('/feedback', function (req, res, next) {

    const fdbdata = {

        cuzname:req.body.cuzname,
        ctype:req.body.ctype,
        cuzcom:req.body.cuzcom,

    };
    console.log(fdbdata);

    connection.query("INSERT INTO feedback SET ?", fdbdata, function (err, result) {

        if(err) throw err;
        res.redirect('/feedback');

    });

});




//delete feedback
router.get ('/deletefeedback/:cuzid', function (req, res)  {

    var cuzid = req.params.cuzid;

    connection.query("DELETE FROM feedback WHERE cuzid = ?", [cuzid], function (err,rows) {
        if(err) throw err;
        res.redirect('/delfeedback');
    });
});




router.get('/admin', function(req, res) {

    var adminid = req.params.aid;

    connection.query("SELECT * FROM admin WHERE aid = ?", [adminid], function(err, rows) {
    if (err) throw err;
    res.render('admin', {admin:rows});

    });

});




//view admin details
router.get('/viewadmin',function(req, res, next) {

    connection.query("SELECT aid, afname, alname, asection FROM admin", function(err , rows) {

        if (err) throw err;

        console.log (rows);

        res.render('viewadmin', {admin:rows});

    });

});




//delete single admin 
router.get('/deleteAdmin/:aid', function (req, res) {

    var adid = req.params.aid;

    connection.query("DELETE FROM admin WHERE aid = ?", [adid], function(err,rows){
        if (err) throw err;
        res.redirect('/viewadmin');

    });
});




//update admin account
router.get('/adminprofile/:aid', function(req, res) {

    var adminid = req.params.aid;

    connection.query("SELECT * FROM admin WHERE aid = ?", [adminid], function(err, rows) {
    if (err) throw err;
    res.render('adminprofile', {adminData:rows});

    });

});


    router.post('/update/:aid', function(req, res) {

        //var aid = req.body.aid;
      // var adminpic = req.body.adminpic;
       var afname = req.body.afname;
       var alname = req.body.alname;
       var aphone = req.body.aphone;
       var asection = req.body.asection;
       var aemail = req.body.aemail;
       var apsw = req.body.apsw;

       var idad = req.params.aid;

       connection.query("UPDATE admin SET afname =?, alname =?, aphone =?, asection =?, aemail =?, apsw =? WHERE aid =?", [ afname, alname,aphone, asection, aemail, apsw, idad], function (req, respond) {
           if (err) throw err;
           res.redirect('/update');
       });

    });





    router.get("/alogin", function(req, res){
        res.redirect('/alogin');
    });

    router.post("/alogin", function(req, res){
        var aemail = req.body.aemail;
        var apsw = req.body.apsw;

        connection.query("SELECT* FROM admin WHERE aemail = ? and apsw = ?",[aemail,apsw],function(error,results,fields){
            if (results. length > 0) {
                res.redirect("/admin");
            } else {
                res. redirect("/alogin");
            }

            console.log(rows);
        });
    });




module.exports = router;
