let user = document.getElementById("user");
let currUser = localStorage.getItem("currUser");
user.innerText = `Login: ${currUser}`;