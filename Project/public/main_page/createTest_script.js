let currentTest = null;

function createTest(e) {

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

    let menu = document.querySelector(".menu");
    if (menu === null){
        menu = document.createElement("div");
        menu.className = "menu";
        parent.appendChild(menu);

        let addQ = document.createElement("div");
        addQ.className = "addQuestion";
        addQ.innerText = "Добавить вопрос"
        menu.appendChild(addQ);
        addQ = document.querySelector(".addQuestion");
        addQ.addEventListener("click", addQuestion);
    }
    showTestToMakeChanges();
};

function deleteItem(e){
    let item = e.target.parentNode.parentNode;
    item.parentNode.removeChild(item);
}

function deleteItemItem(e){
    let item = e.target.parentNode;
    item.parentNode.removeChild(item);
}

function addTestSaveBtn(){
    let test = document.querySelector("section");

    let saveBtn = document.querySelector(".saveTest");
    if(saveBtn == null) {
        saveBtn = document.createElement("button");
        saveBtn.className = "saveTest";
        saveBtn.innerText = "Сохранить";
        test.appendChild(saveBtn);
        saveBtn = document.querySelector(".saveTest");
        saveBtn.addEventListener("click", saveTest);
    }

    let appointBtn = document.querySelector(".appointTest");
    if(appointBtn == null) {

        let student = document.createElement("input");
        student.className = "studentInp";
        student.value = "Введите Логин студента";
        student.type = "text";
        test.appendChild(student);

        appointBtn = document.createElement("button");
        appointBtn.className = "appointTest";
        appointBtn.innerText = "Назначить";
        appointBtn.addEventListener("click", appointTest);
        test.appendChild(appointBtn);
    }

}

function addQuestionFrame(questionWrapper, qNum){
    let qType = document.createElement("div");
    qType.className = "qType";

    let inputAnswer = document.createElement("p");
    inputAnswer.className = "inputAnswer";
    inputAnswer.innerText = "Ввод ответа";

    let chooseAnswer = document.createElement("p");
    chooseAnswer.className = "chooseAnswer";
    chooseAnswer.innerText = "Выбор ответа";

    questionWrapper.appendChild(qType);
    qType = questionWrapper.querySelector(".qType");

    qType.appendChild(inputAnswer);
    qType.appendChild(chooseAnswer);

    let del = document.createElement("img");
    del.className = "iconDel";
    del.id = `del${qNum}`;
    del.src = "./images/bin.png";
    del.alt = "bin";
    
    questionWrapper.appendChild(del);
    del = questionWrapper.querySelector(".iconDel");
    del.addEventListener("click", deleteItemItem);

    inputAnswer = questionWrapper.querySelector(".inputAnswer");
    inputAnswer.addEventListener("click", createInputAnswer);
    chooseAnswer = questionWrapper.querySelector(".chooseAnswer");
    chooseAnswer.addEventListener("click", createChooseAnswer);
}

function addQuestion(){
    let test = document.querySelector("section");
    let title = document.querySelector(".testTitleSaved");
    let titlePrototype = document.querySelector(".testTitleInp");

    if (title == null && titlePrototype == null){
        let title = document.createElement("input");
        title.className = "testTitleInp";
        title.type = "text";
        title.value = "Введите название теста";
        test.appendChild(title);
        title = document.querySelector(".testTitleInp");
        title.addEventListener("change", saveTitle);
    }
    addTestSaveBtn();

    let saveBtn = document.querySelector(".saveTest");
    qNum = document.querySelectorAll(".questionWrapper").length;
    
    let questionWrapper = document.createElement("div");
    questionWrapper.className = "questionWrapper";
    questionWrapper.id = `q${qNum}`;

    test.insertBefore(questionWrapper, saveBtn);
    questionWrapper = document.getElementById(`q${qNum}`);

    addQuestionFrame(questionWrapper, qNum);
}

function createQBody(e) {
    let parent = e.target.parentNode.parentNode;

    let qTitle = document.createElement("input");
    qTitle.className = "qTitleInp";
    qTitle.value = "Введите заголовок вопроса";
    qTitle.type = "text";
    parent.appendChild(qTitle);
    qTitle = parent.querySelector(".qTitleInp");
    qTitle.addEventListener("change", saveTitle);

    let qContent = document.createElement("textarea");
    qContent.className = "qContentInp";
    qContent.value = "Введите текст вопроса";
    parent.appendChild(qContent);
    qContent = parent.querySelector(".qContentInp");
    qContent.addEventListener("change", saveTitle)
}

function createInputAnswer(e) {
    let parent = e.target.parentNode.parentNode;
    e.target.style.backgroundColor = "#303C6C";
    e.target.parentNode.querySelector(".chooseAnswer").style.backgroundColor = "#b4dbe5";

    if(parent.childNodes.length <= 2){
        createQBody(e);
    }
    if (parent.querySelector(".qAnswerInp") == null){
        let qAnswer = document.createElement("input");
        qAnswer.className = "qAnswerInp";
        qAnswer.value = "Введите правильный ответ";
        qAnswer.type = "text";
        parent.appendChild(qAnswer);
        qAnswer = parent.querySelector(".qAnswerInp");
        qAnswer.addEventListener("change", saveTitle);
    }
    let checkboxes = parent.querySelectorAll(".checkboxWrapper");
    for (check of checkboxes){
        parent.removeChild(check);  
    }
    let btn = parent.querySelector(".addCheckboxBtn");
    if (btn != null) {
        parent.removeChild(btn);
    }   
}

function createChooseAnswer(e) {
    let parent = e.target.parentNode.parentNode;
    e.target.style.backgroundColor = "#303C6C";
    e.target.parentNode.querySelector(".inputAnswer").style.backgroundColor = "#b4dbe5";

    if(parent.childNodes.length <= 2){
        createQBody(e);
    }

    let inpAnswer = parent.querySelector(".qAnswerInp");
    let savedAnswer = parent.querySelector(".qAnswerSaved");
    let qChoice = parent.querySelectorAll(".qChoice");
    if(inpAnswer != null){
        parent.removeChild(inpAnswer);
    }
    if(savedAnswer != null){
        parent.removeChild(savedAnswer);
    }
    if(qChoice.length == 0){
        addCheckbox(e);
    }
}
let checkboxNum = 0;

function addCheckbox(e) {
    let parent = null;
    if (e.target.className === "addCheckboxBtn"){
        parent = e.target.parentNode;
    }
    else {
        parent = e.target.parentNode.parentNode;
    }
    let qId = parent.id;

    if(parent.querySelector(".addCheckboxBtn") == null){
        let addCheckboxBtn = document.createElement("button");
        addCheckboxBtn.className = "addCheckboxBtn";
        addCheckboxBtn.innerText = "+";
        parent.appendChild(addCheckboxBtn);
    }
    addCheckboxBtn = parent.querySelector(".addCheckboxBtn");
    addCheckboxBtn.addEventListener("click", addCheckbox);

    let checkboxWrapper = document.createElement("div");
    checkboxWrapper.className = "checkboxWrapper";
    checkboxWrapper.id = `checkboxWrapper${qId}${checkboxNum}`;
    parent.insertBefore(checkboxWrapper, addCheckboxBtn);
    checkboxWrapper = document.getElementById(`checkboxWrapper${qId}${checkboxNum}`);
    checkboxNum++;

    let del = document.createElement("img");
        del.className = "iconDelCheck";
        del.src = "./images/bin.png";
        del.alt = "bin";

    checkboxWrapper.appendChild(del);
    del = checkboxWrapper.querySelector(".iconDelCheck");
    del.addEventListener("click", deleteItemItem);

    let qChoice = document.createElement("input");
        qChoice.className = "qChoice";
        qChoice.type = "checkbox";
        checkboxWrapper.appendChild(qChoice);
    
    let checkboxInp = document.createElement("input");
        checkboxInp.className = "checkboxInp";
        checkboxInp.value = "Введите вариант ответа и отметьте, если он верный";
        checkboxInp.type = "text";
        checkboxWrapper.appendChild(checkboxInp);
        checkboxInp = checkboxWrapper.querySelector(".checkboxInp");
        checkboxInp.addEventListener("change", saveTitle);
}

function saveTitle(e){
    let title = e.target;
    let content = title.value;

    let savedTitle = document.createElement("h1");

    if(title.className === "testTitleInp"){
        savedTitle.className = "testTitleSaved";
    }
    else if (title.className === "qTitleInp"){
        savedTitle.className = "qTitleSaved";
    }
    else if (title.className === "qAnswerInp"){
        savedTitle.className = "qAnswerSaved";
    }
    else if (title.className === "qContentInp"){
        savedTitle.className = "qContentSaved";
    }
    else if (title.className === "checkboxInp"){
        savedTitle.className = "checkboxSaved";
    }
    
    savedTitle.innerText = content;

    title.parentNode.insertBefore(savedTitle, title);
    if(title.className === "testTitleInp"){
        savedTitle = document.querySelector(".testTitleSaved");
    }
    else if (title.className === "qTitleInp"){
        savedTitle = title.parentNode.querySelector(".qTitleSaved");
    }
    else if (title.className === "qAnswerInp"){
        savedTitle.innerText = `Ответ: ${content}`;
        savedTitle = title.parentNode.querySelector(".qAnswerSaved");
    }
    else if (title.className === "qContentInp"){
        savedTitle = title.parentNode.querySelector(".qContentSaved");
    }
    else if (title.className === "checkboxInp"){
        savedTitle = title.parentNode.querySelector(".checkboxSaved");
    }

    title.parentNode.removeChild(title);
    savedTitle.addEventListener("dblclick", changeTitle);
};

function changeTitle(e){
    let title = e.target;
    let content = title.innerText;

    let inpTitle = document.createElement("input");
    inpTitle.type = "text";

    if(title.className === "testTitleSaved"){
        inpTitle.className = "testTitleInp";
    }
    else if (title.className === "qTitleSaved"){
        inpTitle.className = "qTitleInp";
    }
    else if (title.className === "qAnswerSaved"){
        content = content.replace("Ответ: ", "");
        inpTitle.className = "qAnswerInp";
    }
    else if (title.className === "qContentSaved"){
        inpTitle = document.createElement("textarea");
        inpTitle.className = "qContentInp";
    }
    else if (title.className === "checkboxSaved"){
        inpTitle.className = "checkboxInp";
    }
    
    inpTitle.value = content;

    title.parentNode.insertBefore(inpTitle, title);

    if(title.className === "testTitleSaved"){
        inpTitle = document.querySelector(".testTitleInp");
    }
    else if (title.className === "qTitleSaved"){
        inpTitle = document.querySelector(".qTitleInp");
    }
    else if (title.className === "qAnswerSaved"){
        inpTitle = document.querySelector(".qAnswerInp");
    }
    else if (title.className === "qContentSaved"){
        inpTitle = document.querySelector(".qContentInp");
    }
    else if (title.className === "checkboxSaved"){
        inpTitle = document.querySelector(".checkboxInp");
    }


    title.parentNode.removeChild(title);

    inpTitle.addEventListener("change", saveTitle);

};