const form=document.getElementById("form");
const name=document.getElementById("name");
const password=document.getElementById("password");

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    checkInputs();
});
function checkInputs(){
    const nameValue=name.value.trim();
    const passwordValue=password.value.trim();

    if(nameValue==''){
        alert("Please enter User name")
    }
}