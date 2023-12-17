let tasksMenu = document.getElementById("tasksMenu");
tasksMenu.addEventListener("click", async function(){
    let tasksSection = document.querySelector("aside");
    tasksSection.innerHTML= "";

    let taskContent = document.querySelector("section");
    taskContent.innerHTML = "";

    let student = document.getElementById("user").innerText.split(": ")[1];
    let content = {user: student};
    content = JSON.stringify(content);

    let response = await fetch("/getTasks", { method: "POST", headers: {
        'Content-Type': 'application/json'}, body: content});

    response = await response.json();

   
    if (response){
        restoreTasks(response);  
    }

});

let counter = 0;
let testNumber = 0;

function  restoreTasks(response){
    for(key in response){

        let tasksSection = document.querySelector("aside");
        let folder = document.createElement("div");
        folder.className = "folder";
        folder.id = `folder${counter}`;
    
        let folderWrapper = document.createElement("div");
        folderWrapper.className = "folderWrapper";
        folderWrapper.id = `folderWrapper${counter}`;
    
        let img = document.createElement("img");
        img.className = "icon";
        img.id = `img${counter}`;
        img.src = "./images/folder.png";
        img.alt = "folder";
        img.addEventListener("click", showHide);
        folderWrapper.appendChild(img);
    
    
        let savedName = document.createElement("p");
        savedName.className = "savedName";
        savedName.id = `savedName${counter}`;
        savedName.innerText = key; 
        folderWrapper.appendChild(savedName);
        
    
        folder.appendChild(folderWrapper);
        tasksSection.appendChild(folder);
    
        counter++;

        for (let i = 0; i < response[`${key}`].length; i++){
        
        let testWrapper = document.createElement("div");
        testWrapper.className = "testWrapper";
        testWrapper.id = `testWrapper${testNumber}`;

        folder.appendChild(testWrapper);
        testWrapper = document.getElementById(`testWrapper${testNumber}`);

        let imgTest = document.createElement("img");
        imgTest.className = "icon";
        imgTest.src = "./../../images/test.png";
        imgTest.alt = "test";


        let savedNameTest = document.createElement("p");
        savedNameTest.className = "savedName";
        savedNameTest.id = `savedNameTest${testNumber}`; 
        savedNameTest.innerText = response[`${key}`][i]; 
        savedNameTest.addEventListener("click", showTest);
    
        testWrapper.appendChild(imgTest);
        testWrapper.appendChild(savedNameTest);

        testNumber++;
        }
    }        
}

function showTest(e){
    let allNames = document.querySelectorAll(".savedName");
    for (itemName of allNames) {
        if (itemName.classList.contains('focused')){
            itemName.classList.remove("focused");
        }
    }
    e.target.classList.add ("focused");
    currentTest = e.target;

    let parent = document.querySelector("section");
    parent.innerHTML = "";

    showTestToComplete();

}

async function showTestToComplete(){

    let student = document.getElementById("user").innerText.split(": ")[1];
    let folderName = currentTest.parentNode.parentNode.querySelector(".savedName").innerText;
    let testName = currentTest.innerText;
    let pathStr = `tasks/${student}/${folderName}/${testName}.txt`;
    let content = JSON.stringify({path: pathStr});

    let response = await fetch("/showTest", { method: "POST", headers: {
        'Content-Type': 'application/json'}, body: content});

    let respObj = await response.json();
    respObj = JSON.parse(respObj);
    buildTest(respObj);

}
function addSubmitBtn(){
    let test = document.querySelector("section");

    let submitBtn = document.querySelector(".submitTest");
    submitBtn = document.createElement("button");
    submitBtn.className = "submitTest";
    submitBtn.innerText = "Проверить";
    submitBtn.addEventListener("click", submitTest);
    test.appendChild(submitBtn);
}

function buildTest(respObj){
    addSubmitBtn();
    let submitBtn = document.querySelector(".submitTest");
    if(respObj !== null){
        let test = document.querySelector("section");
        let title = document.createElement("h1");
        title.className = "testTitleSaved";
        title.innerText = respObj.title;
        test.insertBefore(title, submitBtn);

        let qNum = respObj.questionsNum;
        for (let i = 0; i < qNum; i++){
            let questionWrapper = document.createElement("div");
            questionWrapper.className = "questionWrapper";
            questionWrapper.id = `q${i}`;

            test.insertBefore(questionWrapper, submitBtn);
            questionWrapper = document.getElementById(`q${i}`);

            let qTitle = document.createElement("h1");
            qTitle.className = "qTitleSaved";
            qTitle.innerText = respObj.questions[`${i}`].qTitle;
            questionWrapper.appendChild(qTitle);
   
            let qContent = document.createElement("h1");
            qContent.className = "qContentSaved";
            qContent.innerText = respObj.questions[`${i}`].qContent;
            questionWrapper.appendChild(qContent);

            let checkboxes = Object.keys(respObj.questions[`${i}`].qAnswerChoose);

            if (checkboxes.length <= 0){
                let qAnswer = document.createElement("input");
                qAnswer.className = "qAnswerInp";
                qAnswer.value = "Введите ответ";
                qAnswer.type = "text";
                qAnswer.addEventListener("change", saveTitle);
                questionWrapper.appendChild(qAnswer);
            }
            else {
                let qId = questionWrapper.id;

                    for (let j = 0; j < checkboxes.length; j++){
                        let checkboxWrapper = document.createElement("div");
                            checkboxWrapper.className = "checkboxWrapper";
                            checkboxWrapper.id = `checkboxWrapper${qId}${j}`;

                            let qChoice = document.createElement("input");
                                qChoice.className = "qChoice";
                                qChoice.type = "checkbox";                             
                                checkboxWrapper.appendChild(qChoice);

                            let checkboxInp = document.createElement("h1");
                                checkboxInp.className = "checkboxSaved";
                                checkboxInp.innerText = checkboxes[j];
                                checkboxWrapper.appendChild(checkboxInp);

                            questionWrapper.appendChild(checkboxWrapper);
                    }
            }
        }     
    }
}
