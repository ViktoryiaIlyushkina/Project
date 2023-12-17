let regBtn = document.getElementById("registerBtn");

regBtn.addEventListener("click", async function(){

    let loginOK = checkLogin();
    let passwordOK = checkPassword();
    let repeatOK = repPassword();

    if(loginOK && passwordOK && repeatOK){

      let usPass = {
        user: user,
        password: password
      }

      let content = JSON.stringify(usPass);

      let response = await fetch("/saveUser", { method: "POST", headers: {
        'Content-Type': 'application/json'}, body: content});

        if(localStorage.getItem('user') === null){
            localStorage.setItem('user', user);
            localStorage.setItem('password', password);
        }
        else {
            localStorage.removeItem('user');
            localStorage.setItem('user', user);
            localStorage.removeItem('password');
            localStorage.setItem('password', password);
        }
        window.location.href="http://localhost:3000";
    }
});

let loginRegex = /^[a-z0-9]{1,20}$/i;
let loginReg = document.getElementById("loginReg");
loginReg.addEventListener("input", function(){
    document.getElementById("warning2").innerText = "";
});

let user = null;
let password = "";

function checkLogin(){
    let warnMsgNoLogin = "Введите Логин";
    let warnMsgWrongLogin = "Логин должен содержать только латинские буквы и цифры";
    let warnMsgAlreadyExists = "Пользователь под данным Логином уже зарегистрирован";

    if (loginReg.value === ""){
      document.getElementById("warning2").innerText = warnMsgNoLogin;
      return false;
    }
    else if (!loginRegex.test(loginReg.value)){
      document.getElementById("warning2").innerText = warnMsgWrongLogin;
      return false;
    }
    else {
      user = loginReg.value;
      return true;
    }
  }

  let passwordReg = document.getElementById("passwordReg");
  passwordReg.addEventListener("input", function(){
    password = passwordReg.value;
    document.getElementById("warning3").innerText = "";
  });
  let lowLetters = /[a-z]/g;
  let upLetters = /[A-Z]/g;
  let numbers = /[0-9]/g;

  function checkPassword() {
    let warnMsgNoPassword = "Введите пароль";
    let warnMsgInvalidPassword = "Пароль должен содержать латинские буквы, большие буквы и цифры";
    if (password === ""){
       document.getElementById("warning3").innerText = warnMsgNoPassword;
       return false;
    }
    else if (password.match(lowLetters) && 
             password.match(upLetters) &&
             password.match(numbers)){
      return true;
    }
    else {
      document.getElementById("warning3").innerText = warnMsgInvalidPassword;
      return false;
    }
  }


  let repeat = document.getElementById("repeat");
  repeat.addEventListener("input", function(){
    document.getElementById("warning4").innerText = "";
});

  function repPassword(){
    let warnMsgNoRepeat = "Повторите пароль";
    let warnMsgNoMatch = "Пароли не совпадают";
    if(repeat.value === ""){
        document.getElementById("warning4").innerText = warnMsgNoRepeat;
        return false;
    }
    else if(repeat.value !== password){
        document.getElementById("warning4").innerText = warnMsgNoMatch;
    }
    else if (repeat.value === password){
        return true;
    }
   
  };
