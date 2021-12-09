"use strict"
// getting all required elements
let inputBox = document.getElementById("getData");
let addBtn = document.getElementById("addBtn");
let todoList = document.getElementById("todoList");
let deleteAllBtn = document.getElementById("clearBtn");
let editBtn = document.getElementById("editBtn");
let pendingTasksNumb = document.getElementById("pendingTasks");
let  listArray = [];
let currentIndex = 0;
if (localStorage.getItem("New Todo") != null) {
    listArray = JSON.parse(localStorage.getItem("New Todo")); //transforming json string into a js object
    showTasks(); //calling showTask function

} 

inputBox.addEventListener('keyup',()=>{
    let userData = inputBox.value;//getting user entered value
    // console.log(userData)
    if (userData.trim() != 0)//if the user value isn't only spaces
    {
        addBtn.classList.add("active"); //active the add button
        editBtn.classList.add("active")
    } else {
        addBtn.classList.remove("active") //unactive the add button
        editBtn.classList.remove("active")
    }

});

addBtn.addEventListener('click', () => { //when user click on plus icon button
    let userEnteredValue = inputBox.value; //getting input field value

    listArray.push(userEnteredValue); //pushing or adding new value in array
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active"); //unactive the add button once the task added
});

function showTasks() {
    pendingTasksNumb.innerHTML = listArray.length; //passing the array length in pendingtask
    if (listArray.length > 0) { //if array length is greater than 0
        deleteAllBtn.classList.add("active"); //active the delete button
    } else {
        deleteAllBtn.classList.remove("active"); //unactive the delete button
    }
    let newLiTag = ``;
    listArray.forEach((element, index) => {
        newLiTag +=`<tr><td  onclick="update(${index})">${element}</td>
      
       <td> <span class="icon" onclick="deleteTask(${index})"><i class="fas fa-trash"></i></span> </td></tr> `;
    });
    todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
    inputBox.value =""; //once task added leave the input field blank
}


// delete task function
function deleteTask(index) {

    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
    
}



deleteAllBtn.addEventListener('click',() => {
    listArray = [];
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
    showTasks(); //call the showTasks function
});

function update(inedx) {
    currentIndex = inedx;
    inputBox.value = listArray[currentIndex];
}
editBtn.addEventListener('click' ,() => {
    listArray[currentIndex] = inputBox.value;
    localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
    showTasks(); //calling showTask function
    addBtn.classList.remove("active");
    editBtn.classList.remove("active");
})