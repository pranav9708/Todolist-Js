//variables
let todos;
const submitBtn=document.getElementById('add-task');
const inputTask=document.getElementById('input-task');
const taskList=document.getElementById('task-list-container');
const noOfTasks=document.getElementById('no-of-tasks');
const clearCompleted=document.getElementById('clear-completed');
const completeAllTask=document.getElementById('complete-all-task');
const modeIcon=document.getElementById('mode-icon');


window.addEventListener('load',()=>{
    //getting all todos from localStorage parsing because we are storing using stringify
    //global variable
    todos=JSON.parse(localStorage.getItem('todos')) || [];
    DisplayToDos();
})

submitBtn.addEventListener('click',()=>{
    if(inputTask.value.trim().length>0){

        const date = new Date();
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        const todo={
            content: inputTask.value,
            done:false,
            createdAt: formattedDate,
        }
        todos.push(todo);
        localStorage.setItem('todos',JSON.stringify(todos));

    }else{
        alert("Please enter a valid task");
    }
    inputTask.value="";

    DisplayToDos();
})


function DisplayToDos(){
    taskList.innerHTML='';
    let count=0;
    todos.forEach(todo=>{
        //counting no of tasks
        count++;

        //main div which contains checkbox + task value + edit and delete button
        let task=document.createElement('div');
        task.classList.add('task');

        //adding checkbutton
        let label = document.createElement('label');
        let input=document.createElement('input');
        input.type='checkbox';
        input.checked=todo.done;
        let span=document.createElement('span');
        span.classList.add('bubble');
        label.appendChild(input);
        label.appendChild(span);
        task.appendChild(label);

        //adding task value and date created
        let content=document.createElement('div');
        content.classList.add('content-container');
        //task content
        let contentInput=document.createElement('input');
        contentInput.value=`${todo.content}`;
        contentInput.classList.add('task-content');
        contentInput.setAttribute('readonly',true);
        //date created
        let dateCreated=document.createElement('div');
        dateCreated.innerText=`${todo.createdAt}`;
        dateCreated.classList.add('task-date');
        content.appendChild(contentInput);
        content.appendChild(dateCreated);
        task.appendChild(content);
        

        //adding edit button
        let edit=document.createElement('button');
        edit.innerHTML='Edit';
        edit.classList.add('editTask');
        task.appendChild(edit);

        //adding delete button to div
        let deleteButton=document.createElement('button');
        deleteButton.innerHTML=`<i class="fa-sharp fa-regular fa-circle-xmark"></i>`;
        deleteButton.classList.add('deleteTask');
        task.appendChild(deleteButton);

        taskList.appendChild(task);

        if(todo.done){
            content.classList.add("line-through");
            count--;
        }

        //checkbox function
        input.addEventListener('click',e=>{
            todo.done=e.target.checked;
            localStorage.setItem('todos',JSON.stringify(todos));

            if(todo.done){
                content.classList.add("line-through");
                count--;
            }else{
                content.classList.remove("line-through");
                count++;
            }

            DisplayToDos();
        })

        // edit button function 
        edit.addEventListener('click',e=>{
            contentInput.removeAttribute('readonly');
            contentInput.focus();
            contentInput.addEventListener('blur',e=>{
                contentInput.setAttribute('readonly',true);
                if(e.target.value.trim().length>0){
                    todo.content=e.target.value;
                    localStorage.setItem('todos',JSON.stringify(todos));    
                }else{
                    alert("please enter a valid input");
                }
                DisplayToDos();
            })

        })

        //delete button function
        deleteButton.addEventListener('click',e=>{
            todos=todos.filter(t=>t!=todo);
            localStorage.setItem('todos',JSON.stringify(todos));
            DisplayToDos();
        })


        //clear completed function
        clearCompleted.addEventListener('click',()=>{
            if(todo.done){
                todos=todos.filter(t=>t!=todo);
                localStorage.setItem('todos',JSON.stringify(todos));
            }
            DisplayToDos();
        })

        //complete all task function
        completeAllTask.addEventListener('click',()=>{
            todo.done=true;
            localStorage.setItem('todos',JSON.stringify(todos));

            if(todo.done){
                content.classList.add("line-through");

            }else{
                content.classList.add("line-through");
            }

            DisplayToDos();
        });
    })

    //updating no of tasks left
    noOfTasks.innerText=`${count}`
}

//dark mode functionality
let darkMode = false;
modeIcon.addEventListener('click', ()=>{
    console.log('clicked dark mode');
    const container = document.getElementById('app-container');
    console.log(container);
    if(!darkMode){

    container.style.setProperty('background-color', 'black');
    container.style.setProperty('color','#fff');
    darkMode = true;
    }else{
        container.style.setProperty('background-color', '#fff'); 
        container.style.setProperty('color','black');
        darkMode=false;
    }
})