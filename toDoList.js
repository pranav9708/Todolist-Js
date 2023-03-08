// variables
const list=document.getElementById('task-list-container');
const addTask=document.getElementById('add-task');
const inputTask=document.getElementById('input-task');
const noOfTask=document.getElementById('no-of-tasks');
const completeAllTask= document.getElementById('complete-all-task');
const clearCompleted=document.getElementById('clear-completed');


noOfTask.innerText=`${list.children.length}`

//this function is called everytime window is clicked to update the no of tasks
document.addEventListener('click',function(e){
    e.preventDefault();
    noOfTask.innerText=`${list.children.length}`
})

//add, check and delete functionality of task items.
addTask.addEventListener('click',function(){
    //main div which contains checkbox + task value + delete button
    let task=document.createElement('div');
    task.classList.add('task');

    //adding task value
    let li=document.createElement('li');
    li.innerText=`${inputTask.value}`;
    
    //adding check button to div
    let checkButton=document.createElement('button');
    checkButton.innerHTML=`<i class="fa-regular fa-circle"></i>`;
    checkButton.classList.add('checkTask');
    task.appendChild(checkButton);
    task.appendChild(li);

    //adding delete button to div
    let deleteButton=document.createElement('button');
    deleteButton.innerHTML=`<i class="fa-sharp fa-regular fa-circle-xmark"></i>`;
    deleteButton.classList.add('deleteTask');
    task.appendChild(deleteButton);

    // checking if user has entered valid input
    if(inputTask.value.trim().length==0){
        alert("Please enter a task!");
    }else{
        list.appendChild(task);
    }

    inputTask.value="";

    let isChecked =false;
    //checkbutton functionality to check a completed task
    checkButton.addEventListener("click",function(){
        if(!isChecked){
            checkButton.innerHTML=`<i class="fa-solid fa-circle-check"></i>`;
            checkButton.parentElement.classList.add("line-through");
            isChecked = true;
        }else{
            checkButton.innerHTML=`<i class="fa-regular fa-circle"></i>`;
            checkButton.parentElement.classList.remove("line-through");
            isChecked = false;
        }
    })

    //deleteButton functionality to delete a task 
    deleteButton.addEventListener("click", function(e){
        let target=e.target;
        target.parentElement.parentElement.remove();
    })

})

//complete tasks all at once
completeAllTask.addEventListener('click', function(){
    let children=list.children;
    for(let i=0;i<children.length;i++){
        let child=children[i];
        child.classList.add('line-through');
        let checkbox=child.getElementsByClassName('checkTask');
        for(let i=0;i<checkbox.length;i++){
            checkbox[i].innerHTML=`<i class="fa-solid fa-circle-check"></i>`
        }
    }
})

//clear all checked/completed tasks all at once
clearCompleted.addEventListener('click', function(){
    let children=list.children;
    console.log(children);
    for(let i=0;i<children.length;i++){
        let child=children[i];
        console.log("hi");
        if(child.classList.contains('line-through')){
            child.remove();
            i--;
        }
    }
})

