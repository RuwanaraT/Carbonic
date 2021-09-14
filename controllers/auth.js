
  var mysql=require('mysql');
  const jwt=require('jsonwebtoken');
  const bcrypt=require('bcryptjs');
  const nodemailer=require('nodemailer');
  const {promisify}=require('util');

  const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "carbonic"
  });
  exports.blogin= async (req,res)=>{
      try {
          const{email,password}=req.body;
          if( !email || !password){
              return res.status(400).render('blogin',{
                message:'Pleace Enter Email and Password'
              })
          }
     db.query('SELECT * FROM bdetails WHERE email=?', [email], async(error,results)=>{
        console.log(results);
        if(!results || !(await bcrypt.compare(password,results[0].password))){
            res.status(401).render('blogin',{
                message:'Email or Password incorrect'
            })
        }else{
            const id=results[0].id;
            const token=jwt.sign({id},process.env.JWT_SECRET,{
                expiresIn:process.env.JWT_EXPIRES_IN

            });
            console.log("Token is"+token);
            const cookieOption={
                expires:new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES *24*60*60*3600
                ),
                httpOnly:true

            }
            res.cookie('jwt',token,cookieOption);
           res.status(200).render("buyerDashboard");
           

        }

     })
          
      } catch (error) {
          console.log(error)
          
      }

  }


exports.bregister=(req,res)=>{
    console.log(req.body);
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const confirmPassword=req.body.confirmPassword;
    const address=req.body.address;
    const contactNumber=req.body.contactNumber;
   
    db.query('SELECT email FROM bdetails WHERE email=?',[email], async (error,results)=>{
        if(error){
            console.log(error);
        }if(results.length>0){

            return res.render('bregister',{
                message:'Email is already use'
            })
        }else if(password!==confirmPassword){
            return res.render('bregister',{
                message:'Password is not same'
            });
        }
        //new
        // else if(name==0){
        //     return res,render('bregister',{
        //         message:'plese enter username'
        //     })
        // }

        let hashedPassword= await bcrypt.hash(password, 8);
        console.log(hashedPassword);
        db.query('INSERT INTO bdetails SET ?',{name:name ,email:email , password:hashedPassword, address:address ,contactNumber:contactNumber}, (error,results)=>{
         
            if(error){
                console.log(error);
            }else{
                console.log(results);
                return res.render('bregister',{
                    message:'Welcome to Carbonic !!!'
                })
            }
        })

    });

} 
exports.contact=(req,res)=>{
            
    console.log(req.body);
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'carbonic30@gmail.com',
            pass:'rootroot'
        }
    })
    const mailOption={
        from:req.body.email,
        to:'carbonic30@gmail.com',
        subject:'Message From '+ req.body.email,
        text:req.body.message
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
exports.isLoggedIn=async(req,res,next)=>{
    //console.log(req.cookies);
    if(req.cookies.jwt){
        try {
            //01)Token in correct or not
            const decoded=await promisify(jwt.verify)(req.cookies.jwt,
                process.env.JWT_SECRET
                );
                console.log(decoded)
                //User is exsixt
                db.query('SELECT * FROM bdetails WHERE id=?',[decoded.id],(error,results)=>{
                    console.log(results);

                    if(!results){
                        return next();
                    }
                    req.buyer=results[0]
                    return next();
                });
        } catch (error) {
            console.log(error);
            return next();
            
        }
    }else{
        next();

    }
   

}

   
exports.deleteBuyer=(req,res)=>{
    const buyerid=req.params.id;
    // console.log('BUyer Id is'+buyerid);
    // res.send('id received');
    db.query("DELETE FROM bdetails WHERE id=?",[buyerid],function (error,rows){
        if(error) throw err;
        res.render("index");
    })
}

exports.editbuyer=(req,res)=>{
    const buyerid=req.params.id;
    db.query("SELECT * FROM bdetails WHERE id=?",[buyerid],function(err,rows){
       if(err) throw err;
        res.render('editbuyer');
   
    })

}

exports.updatebuyer=(req,res)=>{
    const name=req.body.name;
    const email=req.body.email;
    const address=req.body.address;
    const contactNumber=req.body.contactNumber;
    const id=req.body.id;
    db.query("UPDATE bdetails SET name=?,email=?,address=?,contactNumber=? WHERE id=?",[name,email,address,contactNumber,id],function(err,results){
        if(err) throw err;
        console.log(err);
        res.redirect('profile');
    })
   

}