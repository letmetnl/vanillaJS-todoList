// selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".submit-btn");
const todoList = document.querySelector(".todo-list");

// Event Listeners
todoButton.addEventListener("click", addTodo);

// tasks or functions to be performed on actions
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
}

// function for deleting the task
function deleteTodo(e) {
  // as the full task(todoDiv) is parent of the parent of delete button
  const item = e.target.parentElement;
  // adding class for animation on deleted task
  item.classList.add("fall-animation");
  // using method of js to wait for animation to end
  item.addEventListener("transitionend", function () {
    item.remove();
  });
}

// function for marking a task completed
function completedTodo(e) {
  e.target.parentElement.classList.toggle("completed");
}
