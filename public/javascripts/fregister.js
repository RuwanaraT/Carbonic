
function enableButton()
{
         if(document.getElementById("policy").checked)
         {
              document.getElementById("btn1").disabled = false;
         }
   
         else
         {
              document.getElementById("btn1").disabled = true;
         }

}

function deleteAccount(id) {

     if(id == 'del') {

          confirm("Are You Sure, Do You want to delete Your Account ? ");
     }
     else{

          alert("Account Deletion is Unsuccessful");
     }
}

function alertEmail(result) {

     if(result == 'reset') {
          alert("Password is Reseted Successfully, Please Check Your Email !");
     }
     else{
          alert("Reset Password is Unsuccessful");
     }
}


function retrieveData(value) {

     if(value == "demo") {

          document.getElementById("fname").value = "R.Perera";
          document.getElementById("fnic").value = "692442721V";
          document.getElementById("fmobile").value = "0716429301";
          document.getElementById("fadline1").value = "No:138/A";
          document.getElementById("fadline2").value = "Kudawewa"
          document.getElementById("fdistrict").value = "Kurunegala";
          document.getElementById("fpcode").value = "6000";
          document.getElementById("femail").value = "rangith@gmail.com";
          document.getElementById("fpwd").value = "rangi123";
          document.getElementById("frpwd").value = "rangi123";
     }

     else {
          alert("Invalid");
     }
} 

