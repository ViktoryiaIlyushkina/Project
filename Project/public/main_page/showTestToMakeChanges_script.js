async function showTestToMakeChanges(){
    let owner = document.getElementById("user").innerText.split(": ")[1];
    let folderName = currentTest.parentNode.parentNode.querySelector(".savedName").innerText;
    let testName = currentTest.innerText;
    let pathStr = `tests/${owner}/${folderName}/${testName}.txt`;
    let content = JSON.stringify({path: pathStr});

    let response = await fetch("/showTest", { method: "POST", headers: {
        'Content-Type': 'application/json'}, body: content});

    let respObj = await response.json();
    respObj = JSON.parse(respObj);
    buildEditableTest(respObj);
}

function buildEditableTest(respObj){
    addTestSaveBtn();
    let saveBtn = document.querySelector(".saveTest");
    if(respObj !== null){
        let test = document.querySelector("section");
        let title = document.createElement("h1");
        title.className = "testTitleSaved";
        title.innerText = respObj.title;
        title.addEventListener("dblclick", changeTitle);
        test.insertBefore(title, saveBtn);

        let qNum = respObj.questionsNum;
        for (let i = 0; i < qNum; i++){
            let questionWrapper = document.createElement("div");
            questionWrapper.className = "questionWrapper";
            questionWrapper.id = `q${i}`;
        
            addQuestionFrame(questionWrapper, i);
            test.insertBefore(questionWrapper, saveBtn);
            questionWrapper = document.getElementById(`q${i}`);

            let qTitle = document.createElement("h1");
            qTitle.className = "qTitleSaved";
            qTitle.innerText = respObj.questions[`${i}`].qTitle;
            qTitle.addEventListener("dblclick", changeTitle);
            questionWrapper.appendChild(qTitle);
   
            let qContent = document.createElement("h1");
            qContent.className = "qContentSaved";
            qContent.innerText = respObj.questions[`${i}`].qContent;
            qContent.addEventListener("dblclick", changeTitle);
            questionWrapper.appendChild(qContent);

            let checkboxes = Object.keys(respObj.questions[`${i}`].qAnswerChoose);

            if (checkboxes.length <= 0){
                let qAnswer = document.createElement("h1");
                qAnswer.className = "qAnswerSaved";
                qAnswer.innerText = `Ответ: ${respObj.questions[`${i}`].qAnswerInp}`; 
                qAnswer.addEventListener("dblclick", changeTitle);
                questionWrapper.appendChild(qAnswer); 
            }
            else {
                let qId = questionWrapper.id;

                let addCheckboxBtn = document.createElement("button");
                    addCheckboxBtn.className = "addCheckboxBtn";
                    addCheckboxBtn.innerText = "+";
                    addCheckboxBtn.addEventListener("click", addCheckbox);
                    questionWrapper.appendChild(addCheckboxBtn);

                    for (let j = 0; j < checkboxes.length; j++){
                        let checkboxWrapper = document.createElement("div");
                            checkboxWrapper.className = "checkboxWrapper";
                            checkboxWrapper.id = `checkboxWrapper${qId}${j}`;

                        let del = document.createElement("img");
                            del.className = "iconDelCheck";
                            del.src = "./images/bin.png";
                            del.alt = "bin";
                            del.addEventListener("click", deleteItemItem);
                            checkboxWrapper.appendChild(del);

                            let qChoice = document.createElement("input");
                                qChoice.className = "qChoice";
                                qChoice.type = "checkbox";                             
                                if(respObj.questions[`${i}`].qAnswerChoose[`${checkboxes[j]}`]){
                                    qChoice.checked = "checked";
                                }
                                checkboxWrapper.appendChild(qChoice);

                            let checkboxInp = document.createElement("h1");
                                checkboxInp.className = "checkboxSaved";
                                checkboxInp.innerText = checkboxes[j];
                                checkboxInp.addEventListener("dblclick", changeTitle);
                                checkboxWrapper.appendChild(checkboxInp);

                            questionWrapper.insertBefore(checkboxWrapper, addCheckboxBtn);
                    }
            }
        }     
    }
}