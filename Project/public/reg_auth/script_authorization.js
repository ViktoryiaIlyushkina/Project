let loginAuth = document.getElementById("loginAuth");
let userLogin = localStorage.getItem("user");

let passwordAuth = document.getElementById("passwordAuth");
let userPassword = localStorage.getItem("password");

if(userPassword !== null){
    passwordAuth.value = userPassword;
}

if(userLogin !== null){
  loginAuth.value = userLogin;  
}


let enterBtn = document.getElementById("EnterBtn");
let saveCheckbox = document.querySelector(".saveCheckbox")
enterBtn.addEventListener("click", async function(){

  let loginCheck =  loginAuth.value;
  let passwordCheck = passwordAuth.value;

  let content = { 
    login: loginCheck,
    password: passwordCheck
  };
  content = JSON.stringify(content);
   
  let response = await fetch("/checkUser", { method: "POST", headers: {
    'Content-Type': 'application/json'}, body: content});
    
  let res = await response.json();

  if(!saveCheckbox.checked){
    localStorage.removeItem("password");
    localStorage.removeItem("user");
  }
  else{
    if(localStorage.getItem('user') === null){
      localStorage.setItem('user', loginCheck);
      localStorage.setItem('password', passwordCheck);
     }
     else {
      localStorage.removeItem('user');
      localStorage.setItem('user', loginCheck);
      localStorage.removeItem('password');
      localStorage.setItem('password', passwordCheck);
    }
  }
  if(localStorage.getItem('currUser') === null){
    localStorage.setItem('currUser', loginCheck);
  }
  else {
    localStorage.removeItem('currUser');
    localStorage.setItem('currUser', loginCheck);
  }

  if (res){
    window.location.href="http://localhost:3000/main";
  }
});






 

