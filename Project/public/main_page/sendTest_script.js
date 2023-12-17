async function saveTest() {
    let test = getTest();
    let content = JSON.stringify(test);

    let response = await fetch("/saveTest", { method: "POST", headers: {
        'Content-Type': 'application/json'}, body: content});

    let owner = document.getElementById("user").innerText.split(": ")[1];

    let libr = getLibrary();
        libr["owner"] = owner;
        
    let content2 = JSON.stringify(libr);

    let resp = await fetch("/saveLibrary", { method: "POST", headers: {
            'Content-Type': 'application/json'}, body: content2});
}

function getTest() {
    let owner = document.getElementById("user").innerText.split(": ")[1];

    let folderName = currentTest.parentNode.parentNode.querySelector(".savedName").innerText;
    let testName = currentTest.innerText;
    let titleContent = document.querySelector(".testTitleSaved") === null ? "" : document.querySelector(".testTitleSaved").innerText;
    let questions = document.querySelectorAll(".questionWrapper");
    let qCount = document.querySelectorAll(".questionWrapper").length;

    let questionsArr = [];
    for (q of questions){
        let qTitleSaved = q.querySelector(".qTitleSaved");
        let qContentSaved = q.querySelector(".qContentSaved");
        let qAnswerInput = q.querySelector(".qAnswerSaved");
        let qAnswerChoose = q.querySelectorAll(".checkboxWrapper");

        let answersChoose = {};
        for (choise of qAnswerChoose){
            let text = choise.querySelector(".checkboxSaved").innerText;
            let isRight =  choise.querySelector(".qChoice").checked ? true : false;
            answersChoose[`${text}`] = isRight;
        }
        let question = {
            qTitle: qTitleSaved === null ? "" : qTitleSaved.innerText,
            qContent: qContentSaved === null ? "" : qContentSaved.innerText,
            qAnswerInp: qAnswerInput === null ? "" : qAnswerInput.innerText.replace("Ответ: ", ""),
            qAnswerChoose: qAnswerChoose === null ? "" : answersChoose,
        }
        questionsArr.push(question);
    }
    let test = {
        owner: owner,
        folder: folderName,
        test: testName,
        title: titleContent,
        questionsNum: qCount,
        questions: questionsArr,

    }
    return test;
}

function getLibrary() {
    // let library = document.querySelector("aside");
    // let folders = library.getElementsByClassName("folder");

    let folders = document.querySelector("aside").getElementsByClassName("folder");

    let foldersObj = {};

    for (let i = 0; i < folders.length; i++){
        // let folderWrapper =  folders[i].querySelector(".forderWrapper");
        // console.log(folderWrapper);
        // let folderName = folderWrapper.querySelector(".savedName").innerText;
        // console.log(folderName);
        // let tests = folders[i].getElementsByClassName("testWrapper");
        let folderName = "";
        let testNames = [];        
        let children = folders[i].childNodes;

        // let tests = folders[i].getElementsByClassName("testWrapper");
        // let testNames = [];

        for (let i = 0; i < children.length; i++){
            if(children[i].className === "folderWrapper"){
                let folderContent = children[i].childNodes;
                for (let i = 0; i < folderContent.length; i++){
                    if (folderContent[i].className == "savedName"){
                        folderName = folderContent[i].innerText;
                    }
                }
            }
            if (children[i].className === "testWrapper"){
                let testContent = children[i].childNodes;
                for (let i = 0; i < testContent.length; i++){
                    if (testContent[i].className == "savedName" ||
                        testContent[i].className == "savedName focused"){
                       let test = testContent[i].innerText;
                       testNames.push(test);
                    }
                }
            }
            // let test = tests[i].querySelector(".savedName").innerText;
            // testNames.push(test);
        }

        foldersObj[folderName] = testNames;
    }

    return foldersObj;
}

