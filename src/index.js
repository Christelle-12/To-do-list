import './style.css';
import {createListItem} from './createlist.js'

const tasks = [];

// Add new task function
function addTask(description) {
  const newTask = {
    description,
    completed: true,
    index: tasks.length + 1,
  };
  tasks.push(newTask);
}
addTask('groceries');
const task = { index: 1, description: 'Task 1', completed: true };
const listItem = createListItem(task);

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
  const newTask = {
    description: taskDescription,
    completed: false, // set the completed property to false
    index: tasks.length, // set the index property to the value of the new array length
  };
  tasks.push(newTask);
  renderTaskList();
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
      renderTaskList();
    });
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const index = Number(button.dataset.index);
      const taskIndex = tasks.findIndex((task) => task.index === index);
      tasks.splice(taskIndex, 1);
      renderTaskList();
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderTaskList();
});

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', () => {
  tasks.forEach((task) => {
    if (task.completed) {
      const taskIndex = tasks.findIndex((t) => t.index === task.index);
      tasks.splice(taskIndex, 1);
    }
  });
  
  renderTaskList();
});
