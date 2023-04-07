import './style.css';
import createListItem from './createlist.js';

let tasks = [];

// Retrieve tasks from local storage
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
  tasks = JSON.parse(storedTasks);
}

// Add new task function
function addTask(description) {
  const newTask = {
    description,
    completed: false, // set the completed property to false
    index: tasks.length, // set the index property to the value of the new array length
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Store tasks in local storage
  renderTaskList();
}

function renderTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  const addTaskItem = document.createElement('li');
  addTaskItem.innerHTML = `
    <div class="task-item">
      <div class="task-item__checkbox">
        <input type="checkbox" disabled>
        <label for="add-task"></label>
      </div>
      <div class="task-item__description">
        <form id="add-task-form">
          <input type="text" id="add-task-input" placeholder="Add your task here,,,">
          <button type="submit" id="add-task-button">Add Task</button>
        </form>
      </div>
      <div class="task-item__delete">
      </div>
    </div>
  `;
  taskList.appendChild(addTaskItem);

  const addTaskForm = document.getElementById('add-task-form');
  addTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const taskDescription = document.getElementById('add-task-input').value;
    addTask(taskDescription);
    addTaskForm.reset();
  });

  tasks.forEach((task) => {
    const listItem = createListItem(task);
    taskList.appendChild(listItem);
  });

  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener('change', () => {
      const index = Number(checkbox.id.replace('task-', ''));
      const task = tasks.find((task) => task.index === index);
      task.completed = checkbox.checked;
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTaskList();
    });
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      const taskIndex = tasks.findIndex((task) => task.index === index);
      tasks.splice(taskIndex, 1);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTaskList();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTaskList();
});

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(tasks)); // Update tasks in local storage
  renderTaskList();
});
window.renderTaskList = renderTaskList;
