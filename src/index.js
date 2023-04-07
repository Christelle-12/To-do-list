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
      <div class="task-item__delete">
        <button class="delete-button" data-index="${task.index}">
          <i class="fas fa-trash-alt"></i>
        </button>
      </div>
    </div>
  `;
  return listItem;
}
function renderTaskList() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  // Add "Add Task" input field and button as a separate task item
  const addTaskItem = document.createElement('li');
  addTaskItem.innerHTML = `
    <div class="task-item">
      <div class="task-item__checkbox">
        <input type="checkbox" disabled>
        <label for="add-task"></label>
      </div>
      <div class="task-item__description">
        <form id="add-task-form">
          <input type="text" id="add-task-input" placeholder="Enter task description">
          <button type="submit" id="add-task-button">Add Task</button>
        </form>
      </div>
      <div class="task-item__delete">
      </div>
    </div>
  `;
  taskList.appendChild(addTaskItem);

  const addTaskForm = document.getElementById('add-task-form');
  addTaskForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskDescription = document.getElementById('add-task-input').value;
    const newTask = {
      description: taskDescription,
      completed: false,
      index: tasks.length + 1,
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
    checkbox.addEventListener('change', function() {
      const index = Number(checkbox.id.replace('task-', ''));
      const task = tasks.find((task) => task.index === index);
      task.completed = checkbox.checked;
      renderTaskList();
    });
  });

  const deleteButtons = document.querySelectorAll('.delete-button');
  deleteButtons.forEach((button) => {
    button.addEventListener('click', function() {
      const index = Number(button.dataset.index);
      const taskIndex = tasks.findIndex((task) => task.index === index);
      tasks.splice(taskIndex, 1);
      renderTaskList();
    });
  });
}

document.addEventListener('DOMContentLoaded', function() {
  renderTaskList();
});

const clearButton = document.getElementById('clear-btn');
clearButton.addEventListener('click', function() {
  tasks.forEach((task) => {
    if (task.completed) {
      const taskIndex = tasks.findIndex((t) => t.index === task.index);
      tasks.splice(taskIndex, 1);
    }
  });
  renderTaskList();
});
