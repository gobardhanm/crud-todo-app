// selected all the selectors from the HTML that we need to use

let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

// to validate the input fields

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
  
  let formValidation = () => {
    if (textInput.value === "") {
      console.log("failure");
      msg.innerHTML = "Task cannot be blank";
    } else {
      console.log("success");
      msg.innerHTML = "";
    }
  };

//   we collect the data from the input fields, using the function named acceptData and an array named data. Then we push them inside the local storage

let data = [];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
};

// invoke the function acceptData inside the else statement of the form validation

// let formValidation = () => {

//     // Other codes are here
//      else {
  
//       // Other codes are here
  
//       acceptData();
//     }
//   };
  
// the modal doesn't close automatically. To solve this

let formValidation = () => {
    if (textInput.value === ""){
        console.log("failure");
        msg.innerHTML = "Task cannot be blank."
    }
     else {
        console.log("success");
        msg.innerHTML = "";
  
      acceptData();
      add.setAttribute("data-bs-dismiss", "modal");
      add.click();
  
      (() => {
        add.setAttribute("data-bs-dismiss", "");
      })();
    }
  };

//   In order to create a new task, we need to create a function, use template literals to create the HTML elements, and use a map to push the data collected from the user inside the template

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
      return (tasks.innerHTML += `
      <div id=${y}>
            <span class="fw-bold">${x.text}</span>
            <span class="small text-secondary">${x.date}</span>
            <p>${x.description}</p>
    
            <span class="options">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </span>
          </div>
      `);
    });
  
    resetForm();
  };
  

//   the function will never run unless we invoke it inside the acceptData function

let acceptData = () => {
    // Other codes are here
  
    createTasks();
  };

//   Once we're done collecting and accepting data from the user, we need to clear the input fields. For that we create a function called resetForm

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
  };

//   Function to delete a task
// 
// The first line will delete the HTML element from the screen,
// the second line will remove the targetted Task from the data array,
// and the third line will update the local storage with the new data.

let deleteTask = (e) => {
    e.parentElement.parentElement.remove();
  
    data.splice(e.parentElement.parentElement.id, 1);
  
    localStorage.setItem("data", JSON.stringify(data));
  
    console.log(data);
  };

//   Function to edit tasks
// 
// Line 1 is targetting the task that we selected to edit
// Lines 2, 3, and 4, are targetting the values [task, date, description] of the task that we selected to edit
// line 5 is running the delete function to remove the selected data both from the local storage, HTML element, and data array.

let editTask = (e) => {
    let selectedTask = e.parentElement.parentElement;
  
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
  
    deleteTask(e);
  };

//    to get data from local storage

// If you refresh the page, you'll note that all of your data is gone. In order to solve that issue, we run a IIFE (Immediately invoked function expression) to retrieve the data from local storage

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
  })();
  
  
  