const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const {promisify}=require('util');
const nodemailer = require('nodemailer');

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database : 'Carbonic'

    
});

// route for login
exports.login = async (req, res) => {

    try{

        const{femail,fpwd} = req.body;

        if(!femail || !fpwd) {
            return res.status(400).render('login', {
                message: 'Please provide an email and password'
            })
    }

        db.query('SELECT * FROM farmers WHERE femail = ?', [femail], async (error, results) => {

            console.log(results);

            if(!results || !(await bcrypt.compare(fpwd, results[0].fpwd)) ) {

                res.status(401).render('login', {
                    message: 'Email or password is incorrect'
                })

            } else {
  
                const id = results[0].id;

                const token = jwt.sign({id}, process.env.JWT_SECRET, {

                    expiresIn : process.env.JWT_EXPIRES_IN
                });

                console.log("The token is: " + token);

                const cookieOptions = {
                    expires: new Date(
                        Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000
                    ),
                    
                    httpOnly:true
                }

                res.cookie('jwt', token, cookieOptions);
                res.status(200).redirect("/");
            }
        })

    }catch(error){
        console.log(error);
    }
}

// route for farmer registration
exports.fregister = (req, res) => {

    console.log(req.body);

    const {fname, fnic, fmobile, fadline1, fadline2, fprovince, fdistrict, fpcode, femail, fpwd, frpwd} = req.body;

    db.query('SELECT femail FROM farmers WHERE femail = ?', [femail], async (error, results) => {

        if(error) {
            console.log(error);
        }

        if(results.length > 0) {

            return res.render('fregister', {
               message: 'That email is already in use ???' 
            })
        } else if(fpwd !== frpwd) {

            return res.render('fregister', {
                message: 'Passwords are mismatched ???'
            });
        }

        let hashedPassword = await bcrypt.hash(fpwd, 8);
        console.log(hashedPassword);

        db.query('INSERT INTO farmers SET ?', {fname:fname, fnic:fnic, fmobile:fmobile, fadline1:fadline1, fadline2:fadline2, fprovince:fprovince, fdistrict:fdistrict, fpcode:fpcode, femail:femail, fpwd:hashedPassword}, (error, results) => {
       
            if(error) {
                console.log(error);
            } else {
                console.log(results);
                return res.render('fregister', {
                    message: 'Registration has successfully done !!!'
                });
            }

        })
    });
}

// route for loggedin
exports.isLoggedIn = async (req, res, next) => {

    //console.log(req.cookies);

    if(req.cookies.jwt) {

        try {

            // 1) verify the token
            const decoded = await promisify(jwt.verify)(req.cookies.jwt, process.env.JWT_SECRET);

            console.log(decoded);

            // 2) check if the user is still exsists

            db.query('SELECT * FROM farmers WHERE id = ?', [decoded.id], (error, results) => {

                console.log(results);

                if(!results) {

                    return next();
                }

                req.user = results[0];
                return next();
            })
            
        } catch (error) {
           console.log(error);
           return next(); 
        }
    }else {

        next();
    }
     
}

// route for logout
exports.logout = async (req, res) => { 

    res.cookie('jwt', 'logout', {

        expires : new Date(Date.now() + 2*1000),
        httpOnly : true
    });

    res.status(200).redirect('/');
}

// route for reset password
exports.resetpassword = async (req, res) => {

  var em = req.body.em;
  var pwd = req.body.pwd;

  let encryptPassword = await bcrypt.hash(pwd, 8);

  db.query("UPDATE farmers SET fpwd = ? WHERE femail = ?", [encryptPassword, em], function(err, result) {

    if(err) throw err;
    res.redirect('/resetpassword');
    
  });

  console.log(req.body);
  const transporter=nodemailer.createTransport({
      service:'gmail',
      auth:{
          user:'carbonic30@gmail.com',
          pass:'rootroot'
      }
  })
  const mailOption={
      from: req.body.em,
      to: 'carbonic30@gmail.com',
      subject:'Reset Password',
      text:'Your newly updated password is '+ req.body.pwd
  }
  transporter.sendMail(mailOption,(error,info)=>{
      if(error){
          console.log(error);
          res.send('error')
      }else{
          console.log('Email sent :'+info.response)
          res.send('success')
      }
  })

}