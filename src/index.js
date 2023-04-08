import './style.css';
import createListItem from './createlist.js';
import clearButton from './clearButton.js';

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
    completed: false,
    index: tasks.length + 1, // Updated to set index to the new array length + 1
  };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
}

// Delete task function
function deleteTask(index) {
  const taskIndex = tasks.findIndex((task) => task.index === index);
  tasks.splice(taskIndex, 1);
  tasks.forEach((task, index) => {
    task.index = index + 1;
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
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
          <input type="text" id="add-task-input" placeholder="Add your task here...">
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
      deleteTask(index);
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTaskList();
});

clearButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
});

window.renderTaskList = renderTaskList;
