/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (() => {

eval("const tasks = [\n  {\n    description: 'Go grocery shopping',\n    completed: false,\n    index: 1,\n  },\n  {\n    description: 'Finish homework',\n    completed: true,\n    index: 2,\n  },\n  {\n    description: 'Take out the trash',\n    completed: false,\n    index: 3,\n  },\n];\n\nfunction createListItem(task) {\n  const listItem = document.createElement('li');\n  listItem.innerHTML = `\n    <div class=\"task-item\">\n      <div class=\"task-item__checkbox\">\n        <input type=\"checkbox\" id=\"task-${task.index}\" ${task.completed ? 'checked' : ''}>\n        <label for=\"task-${task.index}\"></label>\n      </div>\n      <div class=\"task-item__description ${task.completed ? 'completed' : ''}\">\n        ${task.description}\n      </div>\n      <div class=\"task-item__delete\">\n        <button class=\"delete-button\" data-index=\"${task.index}\">\n          <i class=\"fas fa-trash-alt\"></i>\n        </button>\n      </div>\n    </div>\n  `;\n  return listItem;\n}\nfunction renderTaskList() {\n  const taskList = document.getElementById('task-list');\n  taskList.innerHTML = '';\n\n  const addTaskItem = document.createElement('li');\n  addTaskItem.innerHTML = `\n    <div class=\"task-item\">\n      <div class=\"task-item__checkbox\">\n        <input type=\"checkbox\" disabled>\n        <label for=\"add-task\"></label>\n      </div>\n      <div class=\"task-item__description\">\n        <form id=\"add-task-form\">\n          <input type=\"text\" id=\"add-task-input\" placeholder=\"Add your task here,,,\">\n          <button type=\"submit\" id=\"add-task-button\">Add Task</button>\n        </form>\n      </div>\n      <div class=\"task-item__delete\">\n      </div>\n    </div>\n  `;\n  taskList.appendChild(addTaskItem);\n\n  const addTaskForm = document.getElementById('add-task-form');\n  addTaskForm.addEventListener('submit', (event) => {\n    event.preventDefault();\n    const taskDescription = document.getElementById('add-task-input').value;\n    const newTask = {\n      description: taskDescription,\n      completed: false,\n      index: tasks.length + 1,\n    };\n    tasks.push(newTask);\n    renderTaskList();\n    addTaskForm.reset();\n  });\n\n  tasks.forEach((task) => {\n    const listItem = createListItem(task);\n    taskList.appendChild(listItem);\n  });\n\n  const checkboxes = document.querySelectorAll('input[type=\"checkbox\"]');\n  checkboxes.forEach((checkbox) => {\n    checkbox.addEventListener('change', () => {\n      const index = Number(checkbox.id.replace('task-', ''));\n      const task = tasks.find((task) => task.index === index);\n      task.completed = checkbox.checked;\n      renderTaskList();\n    });\n  });\n\n  const deleteButtons = document.querySelectorAll('.delete-button');\n  deleteButtons.forEach((button) => {\n    button.addEventListener('click', () => {\n      const index = Number(button.dataset.index);\n      const taskIndex = tasks.findIndex((task) => task.index === index);\n      tasks.splice(taskIndex, 1);\n      renderTaskList();\n    });\n  });\n}\n\ndocument.addEventListener('DOMContentLoaded', () => {\n  renderTaskList();\n});\n\nconst clearButton = document.getElementById('clear-btn');\nclearButton.addEventListener('click', () => {\n  tasks.forEach((task) => {\n    if (task.completed) {\n      const taskIndex = tasks.findIndex((t) => t.index === task.index);\n      tasks.splice(taskIndex, 1);\n    }\n  });\n  renderTaskList();\n});\n\n\n//# sourceURL=webpack://to-do-list/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/index.js"]();
/******/ 	
/******/ })()
;