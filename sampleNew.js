const text = document.querySelector(".txt-box");
const ulList = document.querySelector(".todo-list");
const countItems = document.querySelector(".count");
const filters = document.querySelectorAll(".tab");
const allFiltersTab = document.querySelectorAll(".filter");
const markAll = document.querySelector(".toggle-all");
let currentCategory = 'all';

let Tasks = [];
let filteredTask =[];
let len = 0;

text.addEventListener("keydown", (event) => {
    // console.log(event);
    if(event.key === 'Enter'){
        
       text.value && handleValue(text.value);
  
    // console.log(textVal);
    
    }
    // else{
    //     console.log(event.target.key);
    // }
});

function handleValue(value) {
    task = {
        id: Date.now().toString(),
        name: value,
        status: false,
    }

    Tasks.unshift(task);
    // console.log(Tasks);
    render(Tasks);
    text.value = '';
}

function handleCurrentTab() {
    if (currentCategory === 'clear') return;

    allFiltersTab.forEach((node) => {
        const { value } = node.dataset;

        if (value === currentCategory) {
            node.classList.add('selected');
            console.log(currentCategory);
        } else {
            node.classList.remove('selected');
        }
    })
}

// function to update list
function render(renderTasks) {
    ulList.innerHTML = ""
    // console.log(Tasks,'tash')
    renderTasks.forEach(element => {
        let listItems = document.createElement("li");
        let checkBox = document.createElement("INPUT");
        let deleteButton = document.createElement("BUTTON");
        let inputLabel = document.createElement("label");


        // CheckBox
        checkBox.type = "checkbox";
        checkBox.checked = element.status;
        checkBox.onclick = () =>{completeTask(element.id)}
        if(element.status){

            listItems.classList.toggle("completed-task");
            listItems.classList.add("on-page");
            console.log(listItems);
            // listItems.className = "completed-task";
        }


        // Delete Button
        deleteButton.dataset.id = element.id;
        deleteButton.onclick = () =>{deleteTask(element.id)}

        // Task List Updation
        listItems.dataset.id = element.id;
        inputLabel.textContent = element.name;
        listItems.appendChild(checkBox);
        listItems.appendChild(inputLabel);
        listItems.appendChild(deleteButton);
        ulList.appendChild(listItems);
        // console.log(Tasks);

    // item count updation
    len = renderTasks.filter((task) =>{ return task.status == false
    });
        // console.log(len);
        countItems.innerHTML = len.length;

    markAll.onclick = () => {selectall()}   
    });
    handleCurrentTab();
}

// delete function
function deleteTask(value){
    Tasks = Tasks.filter((Task) =>{
        return Task.id.trim() != value.trim()
    });
    // console.log(Tasks);
     render(Tasks);
     len = Tasks.filter((task) =>{ return task.status == false
     });
         // console.log(len);
         countItems.innerHTML = len.length;

}

// strikethrough function

function completeTask(value){
    // console.log(Tasks);
    Tasks.map(task => {
        if (task.id === value)  {
            task.status = !task.status;
        }
    })
    render(Tasks);
}

function selectall(){
    Tasks.forEach(task => {
        task.status = !task.status
        // if(!task.status){
        //     task.status = true;
        // }
    })
    render(Tasks);
}


// categorizing
filters.forEach(btnFilters => {
    btnFilters.onclick = () =>{allFilters(btnFilters.dataset.value)}
});


function allFilters(category) {
    currentCategory = category
    if(category == 'all'){
     allTask();
     } else if( category == 'active')
    {
        activeTask();
    } else if(category == 'completed')
    {
        finishedTask();
    } else if(category == 'clear')
    {
        allClear();
    }
}

function allTask() {
    filteredTask = Tasks;
    render(filteredTask);
    len = filteredTask.filter((task) =>{ return task.status == false
    });
        // console.log(len);
        countItems.innerHTML = len.length;
}

function activeTask(){
    // console.log(category);
    filteredTask = Tasks.filter((items) => { return items.status == false});
    // console.log(filteredTask);
    render(filteredTask);
    len = filteredTask.filter((task) =>{ return task.status == false
    });
        // console.log(len);
        countItems.innerHTML = len.length;
}

function finishedTask(){
    filteredTask = Tasks.filter((items) => { return items.status == true});
    render(filteredTask);
    len = Tasks.filter((task) =>{ return task.status == false
    });
        // console.log(len);
        countItems.innerHTML = len.length;
}

function allClear(){
    Tasks = Tasks.filter((items) => { return items.status == false});
    render(Tasks);
    len = renderTasks.filter((task) =>{ return task.status == false
    });
        // console.log(len);
        countItems.innerHTML = len.length;
}