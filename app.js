//Define UI Vars

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// load all eventlistener

loadEventListeners();

// load all eventlistener

function loadEventListeners() {

    //DOM Load event
    document.addEventListener('DOMContentLoaded', getTasks);

     // Add task Events
     form.addEventListener('submit', addTask);

     // Remove task Event 
     taskList.addEventListener('click', removeTask);

     //clear task
     clearBtn.addEventListener('click', clearTasks);

     //filter tasks event
     filter.addEventListener('keyup', filterTasks);

}

// Get Tasks from LS
function getTasks() {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.forEach(function(task){
             // create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(task));

      // create new link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //append the link to li
    li.appendChild(link);

    console.log(li);

    //append li to ul
    taskList.appendChild(li);
    })
}

//add Task

function addTask(e) {
    if(taskInput.value === '') {
        alert('Add a task');
    }

    // create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item';

    // create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));

      // create new link element
    const link = document.createElement('a');

    //add class
    link.className = 'delete-item secondary-content';

    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';

    //append the link to li
    li.appendChild(link);

    console.log(li);

    //append li to ul
    taskList.appendChild(li);


    // store in ls
    storeTaskInLocalStorage(taskInput.value);
      
    //clear input
    taskInput.value = '';

    e.preventDefault();
}


//store Task
function storeTaskInLocalStorage(task) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {

        //siffernce between parse and strignify
        //local storage only store string so we have to parse it
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask (e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
             
            if(confirm('Are you sure')) {
                e.target.parentElement.parentElement.remove();

                // Remove from Ls
                removeTaskFromLocalStorage(e.target.parentElement.parentElement);
            }
           
        }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem) {
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));

    }

    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            tasks.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function clearTasks () {
    // slower
    // taskList.innerHTML = '';

    //faster
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }

    //clear from LS
    clearTasksFromLocalStorage();
}

// clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}

// filter Tasks
function filterTasks(e) {
    const text = e.target.value.toLowerCase();
    // console.log(text);

    document.querySelectorAll('.collection-item').forEach
    (function(task){
        const item = task.firstChild.textContent;
        // console.log(item);
        if(item.toLowerCase().indexOf(text) != -1){
              task.style.display = 'block';
        }  else {
               task.style.display = 'none';
        }
    });
}
