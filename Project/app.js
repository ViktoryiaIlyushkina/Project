const express = require("express");
const bp = require('body-parser');
let fs = require('fs');
const path = require("path");


fs.access("tests", function(error){
    if (error) {
        fs.mkdir('tests', err => {
            if(err) throw err;
         });
    } 
});


const app = express();
const port = 3000;

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/reg_auth/authorization.html"));
  });

app.get("/reg", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/reg_auth/registration.html"));
});

app.get("/main", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/main_page/index.html"));
  });

app.use(express.static(__dirname + "/public"));


app.post("/saveTest", (req,res) => {
    console.log(req.body);

    fs.mkdirSync(`tests/${req.body.owner}/${req.body.folder}`,{ recursive: true }, err => {
        if(err) throw err; 
     });

     let content = JSON.stringify(req.body, null, 2);

     fs.writeFile(`tests/${req.body.owner}/${req.body.folder}/${req.body.test}.txt`, content, err => {
        if(err) throw err; 
     });

    res.send(content);

});

app.post("/showTest", (req,res) => {
    let path = req.body.path;
    let content = null;

    try {
        const data = fs.readFileSync(path, 'utf8');
        content = JSON.stringify(data, null, 2);
      } catch (err) {
        console.log("file not found");
      }

    res.send(content);

});

app.post("/saveUser", (req,res) => {
 
     console.log(req.body);

     let content = {};
     user = req.body.user;
     password =  req.body.password;

     try {
      const data = fs.readFileSync(path.join(__dirname, "/users.txt"), 'utf8');
      content = JSON.parse(data);
      content[user] = password;
      content = JSON.stringify(content, null, 2);
    } catch (err) {
      content[user] = password;
      content = JSON.stringify(content, null, 2);
    }

     fs.writeFile(`users.txt`, content, err => {
        if(err) throw err; 
     });

    res.send(content);

});

app.post("/checkUser", (req,res) => {

  let content = false;
  user = req.body.login;
  password =  req.body.password;

  try {
   const data = fs.readFileSync(path.join(__dirname, "/users.txt"), 'utf8');
   let registeredUsers = JSON.parse(data);

   if(Object.keys(registeredUsers).includes(user) && registeredUsers[`${user}`] === password){
    content = true;
   }
   content = JSON.stringify(content, null, 2);
   } catch (err) {
   content = JSON.stringify(content, null, 2);
   }

 res.send(content);

});

app.post("/saveLibrary", (req,res) => {

  let content = {};
  owner = req.body.owner;
  libr = req.body;
  delete libr.owner;

  try {
   const data = fs.readFileSync(path.join(__dirname, `/${owner}/library.txt`), 'utf8');
   content = JSON.parse(data);
   for (key in libr){
    content[`${key}`] = libr[key];
   }
   content = JSON.stringify(content, null, 2);
 } catch (err) {
  for (key in libr){
    content[`${key}`] = libr[key];
   }
   content = JSON.stringify(content, null, 2);
 }

  fs.writeFile(path.join(__dirname, `/tests/${owner}/library.txt`), content, err => {
     if(err) throw err; 
  });

 res.send(content);

});

app.post("/getLibrary", (req,res) => {

  let content = {};
  owner = req.body.user;

  try {
   const data = fs.readFileSync(path.join(__dirname, `/tests/${owner}/library.txt`), 'utf8');
   content = JSON.parse(data);
   content = JSON.stringify(content, null, 2);
 } catch (err) {
   content = false;
   content = JSON.stringify(content, null, 2);
 }

 res.send(content);

});

app.post("/checkStudent", (req,res) => {

  let content = false;
  student = req.body.login;

  try {
   const data = fs.readFileSync(path.join(__dirname, "/users.txt"), 'utf8');
   let registeredUsers = JSON.parse(data);

   if(Object.keys(registeredUsers).includes(student)){
    content = true;
   }
   content = JSON.stringify(content, null, 2);
   } catch (err) {
   content = JSON.stringify(content, null, 2);
   }

 res.send(content);

});

app.post("/appointTest", (req,res) => {
  console.log(req.body);


  fs.mkdirSync(`tasks/${req.body.student}/${req.body.folder}`,{ recursive: true }, err => {
      if(err) {
        console.log("no folder");
        throw err; 
      }
  
   });

   let content = JSON.stringify(req.body, null, 2);

   fs.writeFile(`tasks/${req.body.student}/${req.body.folder}/${req.body.test}.txt`, content, err => {
      if(err) throw err; 
   });

  res.send(content);

});

app.post("/saveTasks", (req,res) => {

  let content = {};
  student = req.body.student;
  task = req.body.task;
  folder = req.body.folder;

  try {
   const data = fs.readFileSync(path.join(__dirname, `/tasks/${student}/tasks.txt`), 'utf8');
   content = JSON.parse(data);
   content[`${folder}`].push(task);
   content = JSON.stringify(content, null, 2);
 } catch (err) {
  content[`${folder}`] = [];
  content[`${folder}`].push(task);
   content = JSON.stringify(content, null, 2);
 }

  fs.writeFile(path.join(__dirname, `/tasks/${student}/tasks.txt`), content, err => {
     if(err) throw err; 
  });

 res.send(content);

});

app.post("/getTasks", (req,res) => {

  let content = {};
  student = req.body.user;

  try {
   const data = fs.readFileSync(path.join(__dirname, `/tasks/${student}/tasks.txt`), 'utf8');
   content = JSON.parse(data);
   content = JSON.stringify(content, null, 2);
 } catch (err) {
   content = false;
   content = JSON.stringify(content, null, 2);
 }

 res.send(content);

});

app.post("/checkTest", (req,res) => {

  let originalTest = {};
  let student = req.body.owner;
  let folder = req.body.folder;
  let test = req.body.test;

  try {
   const data = fs.readFileSync(path.join(__dirname, `tasks/${student}/${folder}/${test}.txt`), 'utf8');
   originalTest = JSON.parse(data);
 } catch (err) {
  console.log("no file");
 }

 let questions = req.body.questionsNum;
 let checkResult = [];
 let rightAnswers = [];
 let answ = [];

 for(let i = 0; i < questions; i++){
  let checkboxesObj = req.body.questions[i].qAnswerChoose;
  let answerStr = req.body.questions[i].qAnswerInp;
  let checkboxesObjOriginal = originalTest.questions[i].qAnswerChoose;
  let answerStrOriginal = originalTest.questions[i].qAnswerInp;

  let compareResult = true;

  if(Object.keys(checkboxesObj).length > 0){
    
    let checkNum = 1;
    for (key in checkboxesObj){
      if(!(checkboxesObj[`${key}`] === checkboxesObjOriginal[`${key}`])){
        compareResult = false;
      }
      if(checkboxesObjOriginal[`${key}`]){
        answ.push(checkNum);
      }
      checkNum++;
    }
    rightAnswers[`${i}`] = answ;
    answ = [];
  }
  else {
    if(!(answerStr === answerStrOriginal)){
      compareResult = false;
    }
    rightAnswers[`${i}`] = answerStrOriginal;
  }
  checkResult.push(compareResult);
  
 }

let content = {
  result: checkResult,
  answers: rightAnswers
}

content = JSON.stringify(content, null, 2);

  res.send(content);

});




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});