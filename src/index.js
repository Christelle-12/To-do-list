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
  tasks.forEach((task) => {
    const listItem = createListItem(task);
    taskList.appendChild(listItem);
  });
}

renderTaskList();
