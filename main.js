let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textarea = document.getElementById('textarea');
let tasks = document.getElementById('tasks')
let add = document.getElementById('add');
let list = [];

form.addEventListener('submit', function(e) {
    e.preventDefault();
    console.log('Submit');
    formvalidation(acceptData);
})

let formvalidation = (acceptData) => {
    if(textInput.value === "" || textarea.value  === "" || dateInput.value  === ""){
        msg.innerHTML = "Please enter all fields";
        console.log('Please enter a valid');
        
    }
    else{
        msg.innerHTML = "";
        console.log("success");
        acceptData()
      
    }
}




let acceptData = () => {
    let data = {
        text: textInput.value,
        date: dateInput.value,
        description: textarea.value,
    };
    list.push(data)
    localStorage.setItem("data",JSON.stringify(list))
    console.log(list);
    createPost();
}

let createPost = () => {
    
    tasks.innerHTML ="";
    list.map((x,y) => {
        console.log(x);
       return (tasks.innerHTML += `
        <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.description}</p>
        <span class="options">
       
          <i data-bs-toggle="modal" data-bs-target="#form" onClick="editPost(this)" class="fas fa-edit"></i>
          <i  onClick="deletePost(this)" class="fas fa-trash-alt"></i>
        </span>
       
        </div>`
       );
    })
  
    resetform();
    
    
    
    
}
let resetform = () => {
    textInput.value ="";
    dateInput.value = "";
    textarea.value = "";


}

let deletePost = (e) => {
    let selectedTask = e.parentElement.parentElement;
    console.log(selectedTask);
    console.log(selectedTask.id);
    list.splice(selectedTask.id,1)
    console.log(list);
    createPost()
    localStorage.setItem("data",JSON.stringify(list))
    
}

let editPost = (e) => {
    let selectedTask = e.parentElement.parentElement;
    textInput.value =selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    // e.parentElement.parentElement.remove();
    list.splice(selectedTask.id,1)
    localStorage.setItem("data",JSON.stringify(list))
}

(() => {
    let data = localStorage.getItem("data");
    if(data){
        list = JSON.parse(data)
        createPost();  
    }else{
        alert("Empty");
    }
    
})();