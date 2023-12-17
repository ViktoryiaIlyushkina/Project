async function submitTest() {
    let test = getTest();

    let content = JSON.stringify(test);

    let response = await fetch("/checkTest", { method: "POST", headers: {
        'Content-Type': 'application/json'}, body: content});

    response = await response.json();

    let questions = document.getElementsByClassName("questionWrapper");

    for(let i = 0; i < questions.length; i++){
        if(response.result[i] === true){
            questions[i].style.backgroundColor = "rgb(183, 220, 183)";
        }
        else{
            questions[i].style.backgroundColor = "rgb(249, 167, 167)";

            let msg = document.createElement("p");
            msg.className = "notice";
            if(typeof(response.answers[i]) === "string"){
                msg.innerText = `Правильный ответ: ${response.answers[i]}; `;
            }
            else{
                for(answ in response.answers[i]){
                    let msgStr = `Правильный ответ: `;
                    for (let j = 0; j < response.answers[i].length; j++){
                        msgStr += questions[i].getElementsByClassName("checkboxSaved")[response.answers[i][j]-1].innerText;
                        msgStr +=  "; ";
                    }
                    msg.innerText = msgStr;
                }
            }
            questions[i].appendChild(msg);        
        }
    }

    let submit = document.querySelector(".submitTest");
    let parent = submit.parentNode;
    parent.removeChild(submit);

    let final = document.createElement("p");
    final.className = "notice";
    let total = response.result.length;
    let correct = 0;
    for (let i = 0; i < response.result.length; i++) {
        if (response.result[i] === true) {
            correct += 1;
        }
      }
    final.innerHTML = `Результат: ${Math.floor(correct/total*100)} %`;
    parent.appendChild(final);

}