// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todos");
const taskCount = document.querySelector(".task-count");

// Event Listeners
todoButton.addEventListener("click", addTodo);
filterOption.addEventListener("click", filterTasks);
//for loading locally stored tasks
document.addEventListener("DOMContentLoaded", getTodos);
// calling the Count-tasks function on pageload
countTasks();

// tasks or functions to be performed on actions

// setting value for taskcount each time page refresh
function countTasks() {
  const count = todoList.childElementCount;
  // set value
  taskCount.innerText = count;
}

function addTodo(event) {
  // preventing default submitting of form
  event.preventDefault();
  // creating a div to contain todo list
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  // creating the list item
  const newTask = document.createElement("li");
  newTask.innerText = todoInput.value;
  newTask.classList.add("task-text");
  todoDiv.appendChild(newTask);

  // adding the task to local storage
  saveTodoToLocal(todoInput.value);
  // creating the buttons for todo-item
  // checkmark button
  const taskCompleted = document.createElement("button");
  taskCompleted.innerHTML = '<i class="fas fa-check"></i>';
  taskCompleted.classList.add("complete-btn");
  todoDiv.appendChild(taskCompleted);

  //Delete button
  const deleteTask = document.createElement("button");
  deleteTask.innerHTML = '<i class="fas fa-trash"></i>';
  deleteTask.classList.add("delete-btn");
  todoDiv.appendChild(deleteTask);

  // append this complete div to todolist in html
  todoList.appendChild(todoDiv);

  // setting input value null after successfully adding the task
  todoInput.value = "";

  // adding eventlistner to delete button
  deleteTask.addEventListener("click", deleteTodo);
  //event listner for marking a task completed
  taskCompleted.addEventListener("click", completedTodo);

  // call countTasks function to update tasks num
  countTasks();
}

// function for deleting the task
deleteTodo = (e) => {
  // as the full task(todoDiv) is parent of the parent of delete button
  const item = e.target.parentElement;
  // adding class for animation on deleted task
  item.classList.add("fall-animation");
  //remove from local storage also
  deleteTodoFromLocal(item);
  // using method of js to wait for animation to end
  item.addEventListener("transitionend", function () {
    // call taskCount
    countTasks();
    item.remove();
  });
};

// function for marking a task completed
function completedTodo(e) {
  e.target.parentElement.classList.toggle("completed");
}

// function for handling task filteration
function filterTasks(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;

      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

// function for storing tasks in local storage
function saveTodoToLocal(todo) {
  let todos;
  // check if there's already any task stored?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // console.log(todo);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

// function for loading locally stored todos
function getTodos() {
  let todos;
  // check if there's already any task stored?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // create the element again
  todos.forEach(function (todo) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // creating the list item
    const newTask = document.createElement("li");
    newTask.innerText = todo;
    newTask.classList.add("task-text");
    todoDiv.appendChild(newTask);

    // creating the buttons for todo-item
    // checkmark button
    const taskCompleted = document.createElement("button");
    taskCompleted.innerHTML = '<i class="fas fa-check"></i>';
    taskCompleted.classList.add("complete-btn");
    todoDiv.appendChild(taskCompleted);

    //Delete button
    const deleteTask = document.createElement("button");
    deleteTask.innerHTML = '<i class="fas fa-trash"></i>';
    deleteTask.classList.add("delete-btn");
    todoDiv.appendChild(deleteTask);

    // append this complete div to todolist in html
    todoList.appendChild(todoDiv);

    // adding eventlistner to delete button
    deleteTask.addEventListener("click", deleteTodo);
    //event listner for marking a task completed
    taskCompleted.addEventListener("click", completedTodo);

    // count tasks after loading from local storage
    countTasks();
  });
}

// function for deleting todos from local storage
function deleteTodoFromLocal(todo) {
  let todos;
  // check if there's already any task stored?
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  // getting index of task by name
  const todoIndex = todos.indexOf(todo.children[0].innerText);
  // console.log(todoIndex);
  // console.log(todo.children[0].innerText);
  todos.splice(todoIndex, 1);

  //setback the localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}
