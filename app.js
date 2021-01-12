// selectors
const todoInput = document.querySelector("todo-input");
const todoButton = document.querySelector("submit-btn");
const todoList = document.querySelector("todo-list");


// Event Listeners
todoButton.addEventListener('click', addTodo);

// tasks or functions to be performed on actions
addTodo = (e) => {
    // preventing default submitting of form
    e.preventDefault();
    // creating a div to contain todo list
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    // creating the list item
    const newTask = document.createElement('li');
    newTask.innerHTML=todoInput;
    newTask.classList.add('list-item');

    // creating the buttons for todo-item
    const 

}