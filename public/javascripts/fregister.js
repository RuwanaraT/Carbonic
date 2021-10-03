/*function checkPassword ()
{
         var check1 = document.getElementById("pwd").value;
         var check2 = document.getElementById("rpwd").value;

         if(check1 != check2)
         {
               alret("Passwords are mismatched !!!");
               return false;
         }
     
         else
         {
              alert("Passwords are matched !!!");
              return true;
         }
         
}*/

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

          alert("Account Deletion is unsuccessful");
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

