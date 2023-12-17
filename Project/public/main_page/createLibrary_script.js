let libraryMenu = document.getElementById("libraryMenu");
let count = 0;

libraryMenu.addEventListener("click", async function (){
    let foldersDiv = document.querySelector("aside");
    foldersDiv.innerHTML = "";
    let testContent = document.querySelector("section");
    testContent.innerHTML = "";
    
    if(foldersDiv.querySelector(".library") === null){
    let library = document.createElement("div");
    library.className = "library";
    
    let libTitle = document.createElement("h2");
    libTitle.innerText = "Моя библиотека";
    library.appendChild(libTitle);
    
    let addFolderBtn = document.createElement("button");
    addFolderBtn.className = "addFolder";
    addFolderBtn.innerText = "+";
    library.appendChild(addFolderBtn);
    
    foldersDiv.appendChild(library);
    }

    addFolderBtn = document.querySelector(".addFolder");
   
    let owner = document.getElementById("user").innerText.split(": ")[1];
    let content = {user: owner};
    content = JSON.stringify(content);

    let response = await fetch("/getLibrary", { method: "POST", headers: {
        'Content-Type': 'application/json'}, body: content});

    response = await response.json();

   

    if (response){
        restoreLibrary(response);  
    }
    
    addFolderBtn.addEventListener("click", function(){
        let folder = document.createElement("div");
        folder.className = "folder";
        folder.id = `folder${count}`;
    
        let folderWrapper = document.createElement("div");
        folderWrapper.className = "folderWrapper";
        folderWrapper.id = `folderWrapper${count}`;
    
        let addTest = document.createElement("button");
        addTest.className = "addTestBtn";
        addTest.innerText = "+"
        addTest.id = `addTestBtn${count}`;
        addTest.addEventListener("click", addTestPage);
        folderWrapper.appendChild(addTest);
    
        let img = document.createElement("img");
        img.className = "icon";
        img.id = `img${count}`;
        img.src = "./images/folder.png";
        img.alt = "folder";
        img.addEventListener("click", showHide);
        folderWrapper.appendChild(img);
    
        let del = document.createElement("img");
        del.className = "icon";
        del.id = `del${count}`;
        del.src = "./images/bin.png";
        del.alt = "bin";
        del.addEventListener("click", deleteItem);
        folderWrapper.appendChild(del);
    
        let inp = document.createElement("input");
        inp.className = "folderName";
        inp.type = "text";
        inp.id = `inp${count}`;
        inp.addEventListener("change", saveName);
        folderWrapper.appendChild(inp);
    
        folder.appendChild(folderWrapper);
        foldersDiv.appendChild(folder);
    
        count++;
    });
});


function showHide(e){
    children = e.target.parentNode.parentNode.querySelectorAll(".testWrapper");

    let show = /^.+folder.+$/;
    let hide = /^.+closed.+$/
    if(show.test(e.target.src)){
        for (child of children){
            child.style.display = "none";
            e.target.src = "./images/closed.png";
        } 
    }
    else if (hide.test(e.target.src)){
        for (child of children){
            child.style.display = "flex";
            e.target.src = "./images/folder.png";
        } 
    }
};

let testNum = 0;

function saveName(e){
    let folder = e.target;
    let name = folder.value;

    let num = folder.id[folder.id.length-1];

    let savedName = document.createElement("p");
    savedName.className = "savedName";
    
    if(folder.parentNode.className === "folderWrapper"){
        savedName.id = `savedName${num}`; 
    }
    else {
        savedName.id = `savedNameTest${testNum}`;
    }
    savedName.innerText = name;

    folder.parentNode.appendChild(savedName);

    if(folder.parentNode.className === "folderWrapper"){
        savedName = document.getElementById(`savedName${num}`);
    }
    else {
        savedName = document.getElementById(`savedNameTest${testNum}`);
        savedName.addEventListener("click", createTest);
        testNum++;
    }

    folder.parentNode.removeChild(folder);

    savedName.addEventListener("dblclick", changeName);
    
};

function changeName(e){
    let folder = e.target;
    let name = folder.innerText;

    let num = folder.id[folder.id.length-1];

    let inp = document.createElement("input");
    inp.className = "folderName";
    inp.type = "text";
    if(folder.parentNode.className == "folderWrapper"){
        inp.id = `inp${num}`;
    }
    else {
        inp.id = `inpTest${testNum}`;
    }
  
    inp.value = name;

    folder.parentNode.appendChild(inp);
   
    if(folder.parentNode.className == "folderWrapper"){
        inp = document.getElementById(`inp${num}`);
    }
    else {
        inp = document.getElementById(`inpTest${testNum}`);
    }

    folder.parentNode.removeChild(folder);

    inp.addEventListener("change", saveName);
};

function addTestPage(e) {
    let folder = e.target.parentNode.parentNode;

    let testWrapper = document.createElement("div");
    testWrapper.className = "testWrapper";
    testWrapper.id = `testWrapper${testNum}`;

    folder.appendChild(testWrapper);
    testWrapper = document.getElementById(`testWrapper${testNum}`);

    let img = document.createElement("img");
    img.className = "icon";
    img.src = "./../../images/test.png";
    img.alt = "test";

    let del = document.createElement("img");
    del.className = "icon";
    del.id = `delTest${testNum}`;
    del.src = "./../../images/bin.png";
    del.alt = "bin";

    let inp = document.createElement("input");
    inp.className = "folderName";
    inp.type = "text";
    inp.id = `inpTest${testNum}`;

    testWrapper.appendChild(img);
    testWrapper.appendChild(del);
    testWrapper.appendChild(inp);

    inp = document.getElementById(`inpTest${testNum}`);
    inp.addEventListener("change", saveName);

    del = document.getElementById(`delTest${testNum}`);
    del.addEventListener("click", deleteItemItem);
    testNum++;

};

function  restoreLibrary(response){
    for(key in response){

        let foldersDiv = document.querySelector("aside");
        let folder = document.createElement("div");
        folder.className = "folder";
        folder.id = `folder${count}`;
    
        let folderWrapper = document.createElement("div");
        folderWrapper.className = "folderWrapper";
        folderWrapper.id = `folderWrapper${count}`;
    
        let addTest = document.createElement("button");
        addTest.className = "addTestBtn";
        addTest.innerText = "+"
        addTest.id = `addTestBtn${count}`;
        addTest.addEventListener("click", addTestPage);
        folderWrapper.appendChild(addTest);
    
        let img = document.createElement("img");
        img.className = "icon";
        img.id = `img${count}`;
        img.src = "./images/folder.png";
        img.alt = "folder";
        img.addEventListener("click", showHide);
        folderWrapper.appendChild(img);
    
        let del = document.createElement("img");
        del.className = "icon";
        del.id = `del${count}`;
        del.src = "./images/bin.png";
        del.alt = "bin";
        del.addEventListener("click", deleteItem);
        folderWrapper.appendChild(del);
    
        let savedName = document.createElement("p");
        savedName.className = "savedName";
        savedName.id = `savedName${count}`;
        savedName.innerText = key; 
        savedName.addEventListener("dblclick", changeName);
        folderWrapper.appendChild(savedName);
        
    
        folder.appendChild(folderWrapper);
        foldersDiv.appendChild(folder);
    
        count++;

        for (let i = 0; i < response[`${key}`].length; i++){
        
        let testWrapper = document.createElement("div");
        testWrapper.className = "testWrapper";
        testWrapper.id = `testWrapper${testNum}`;

        folder.appendChild(testWrapper);
        testWrapper = document.getElementById(`testWrapper${testNum}`);

        let imgTest = document.createElement("img");
        imgTest.className = "icon";
        imgTest.src = "./../../images/test.png";
        imgTest.alt = "test";

        let delTest = document.createElement("img");
        delTest.className = "icon";
        delTest.id = `delTest${testNum}`;
        delTest.src = "./../../images/bin.png";
        delTest.alt = "bin";
        delTest.addEventListener("click", deleteItemItem);

        let savedNameTest = document.createElement("p");
        savedNameTest.className = "savedName";
        savedNameTest.id = `savedNameTest${testNum}`; 
        savedNameTest.innerText = response[`${key}`][i]; 
        savedNameTest.addEventListener("click", createTest);
        savedNameTest.addEventListener("dblclick", changeName);
    
        testWrapper.appendChild(imgTest);
        testWrapper.appendChild(delTest);
        testWrapper.appendChild(savedNameTest);

        testNum++;
        }
    }        
}
