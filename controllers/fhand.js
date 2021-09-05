const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const db = mysql.createConnection({

    host: 'localhost',
    user: 'root',
    password: '',
    database : 'Carbonic'

    
});

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