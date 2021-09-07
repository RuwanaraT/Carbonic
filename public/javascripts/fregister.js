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
