(()=>{const e=[{description:"Go grocery shopping",completed:!1,index:1},{description:"Finish homework",completed:!0,index:2},{description:"Take out the trash",completed:!1,index:3}];function t(){const n=document.getElementById("task-list");n.innerHTML="";const d=document.createElement("li");d.innerHTML='\n    <div class="task-item">\n      <div class="task-item__checkbox">\n        <input type="checkbox" disabled>\n        <label for="add-task"></label>\n      </div>\n      <div class="task-item__description">\n        <form id="add-task-form">\n          <input type="text" id="add-task-input" placeholder="Enter task description">\n          <button type="submit" id="add-task-button">Add Task</button>\n        </form>\n      </div>\n      <div class="task-item__delete">\n      </div>\n    </div>\n  ',n.appendChild(d);const i=document.getElementById("add-task-form");i.addEventListener("submit",(function(n){n.preventDefault();const d={description:document.getElementById("add-task-input").value,completed:!1,index:e.length+1};e.push(d),t(),i.reset()})),e.forEach((e=>{const t=function(e){const t=document.createElement("li");return t.innerHTML=`\n    <div class="task-item">\n      <div class="task-item__checkbox">\n        <input type="checkbox" id="task-${e.index}" ${e.completed?"checked":""}>\n        <label for="task-${e.index}"></label>\n      </div>\n      <div class="task-item__description ${e.completed?"completed":""}">\n        ${e.description}\n      </div>\n      <div class="task-item__delete">\n        <button class="delete-button" data-index="${e.index}">\n          <i class="fas fa-trash-alt"></i>\n        </button>\n      </div>\n    </div>\n  `,t}(e);n.appendChild(t)})),document.querySelectorAll('input[type="checkbox"]').forEach((n=>{n.addEventListener("change",(function(){const d=Number(n.id.replace("task-",""));e.find((e=>e.index===d)).completed=n.checked,t()}))})),document.querySelectorAll(".delete-button").forEach((n=>{n.addEventListener("click",(function(){const d=Number(n.dataset.index),i=e.findIndex((e=>e.index===d));e.splice(i,1),t()}))}))}document.addEventListener("DOMContentLoaded",(function(){t()})),document.getElementById("clear-btn").addEventListener("click",(function(){e.forEach((t=>{if(t.completed){const n=e.findIndex((e=>e.index===t.index));e.splice(n,1)}})),t()}))})();