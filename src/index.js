import './style.css';

const tasks = [
  {
    description: 'Go grocery shopping',
    completed: false,
    index: 1,
  },
  {
    description: 'Finish homework',
    completed: true,
    index: 2,
  },
  {
    description: 'Take out the trash',
    completed: false,
    index: 3,
  },
];

function createListItem(task) {
  const listItem = document.createElement('li');
  listItem.innerHTML = `
    <div class="task-item">
      <div class="task-item__checkbox">
        <input type="checkbox" id="task-${task.index}" ${task.completed ? 'checked' : ''}>
        <label for="task-${task.index}"></label>
      </div>
      <div class="task-item__description ${task.completed ? 'completed' : ''}">
        ${task.description}
      </div>
      <div class="task-item__actions">
        <button class="edit-button" data-index="${task.index}">
          <i class="fas fa-edit"></i>
        </button>
        <button class="delete-button" data-index="${task.index}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `;

  const editButton = listItem.querySelector('.edit-button');
  editButton.addEventListener('click', () => {
    const descriptionElem = listItem.querySelector('.task-item__description');
    const inputElem = document.createElement('input');
    inputElem.type = 'text';
    inputElem.value = descriptionElem.innerText;
    inputElem.addEventListener('blur', () => {
      task.description = inputElem.value;
      descriptionElem.innerText = inputElem.value;
    });
    descriptionElem.innerText = '';
    descriptionElem.appendChild(inputElem);
    inputElem.focus();
  });

  return listItem;
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
  const newTask = {
    description: taskDescription,
    completed: false, // set the completed property to false
    index: tasks.length + 1, // set the index property to the value of the new array length
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
