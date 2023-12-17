async function appointTest(){
    let student = document.querySelector(".studentInp").value;
    document.querySelector(".studentInp").addEventListener("input", function(){
      document.querySelector(".studentInp").style.backgroundColor = "white";
    });
    let testContent = getTest();

    let content = { 
        login: student
      };
      content = JSON.stringify(content);
       
      let response = await fetch("/checkStudent", { method: "POST", headers: {
        'Content-Type': 'application/json'}, body: content});
        
      response = await response.json();

      if(!response){
        document.querySelector(".studentInp").style.backgroundColor = "rgb(249, 167, 167)";
      }
      else{
        document.querySelector(".studentInp").style.backgroundColor = "rgb(183, 220, 183)";
        testContent.student = student;
        content = JSON.stringify(testContent);
        
        let resp = await fetch("/appointTest", { method: "POST", headers: {
          'Content-Type': 'application/json'}, body: content});

        let content2 = {
          task: testContent.test,
          folder: testContent.folder,
          student: testContent.student
        };
        
        content2 = JSON.stringify(content2);

        let response = await fetch("/saveTasks", { method: "POST", headers: {
            'Content-Type': 'application/json'}, body: content2});
          
      }
    

}