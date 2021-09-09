
  var mysql=require('mysql');
  const jwt=require('jsonwebtoken');
  const bcrypt=require('bcryptjs');

  const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "carbonic"
  })


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