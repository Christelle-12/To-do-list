import './style.css';
import { addTask, deleteTask, renderTaskList } from './tasks.js';

document.addEventListener('DOMContentLoaded', () => {
  renderTaskList();
});

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', () => {
  tasks = tasks.filter((task) => !task.completed);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTaskList();
});

window.renderTaskList = renderTaskList;
