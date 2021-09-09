
  var mysql=require('mysql');
  const jwt=require('jsonwebtoken');
  const bcrypt=require('bcryptjs');

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
           res.status(200).redirect("/");
           

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