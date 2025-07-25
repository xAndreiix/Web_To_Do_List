const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const allTab = document.getElementById("all");
const pendingTab = document.getElementById("pending");
const completedTab = document.getElementById("completed");
const clearAllBtn = document.getElementById("clearAll");

let tasks = [];
let currentFilter = "all";

taskInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter" && taskInput.value.trim()) {
    tasks.push({ text: taskInput.value.trim(), done: false });
    taskInput.value = "";
    renderTasks(currentFilter);
  }
});

function renderTasks(filter = "all") {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    if (filter === "pending" && task.done) return;
    if (filter === "completed" && !task.done) return;

    const li = document.createElement("li");
    li.className = task.done ? "completed" : "";
    li.innerHTML = `
            <label>
                <input type="checkbox" ${
                  task.done ? "checked" : ""
                } onchange="toggleDone(${index})">
                <span>${task.text}</span>
            </label>
            <div class="menu">
                <i class='bx bx-dots-horizontal-rounded'></i>
                <div class="menu-content">
                    <div onclick="editTask(${index})"><i class='bx bx-edit'></i> Edit</div>
                    <div onclick="deleteTask(${index})"><i class='bx bx-trash'></i> Delete</div>
                </div>
            </div>
        `;
    li.querySelector(".menu").addEventListener("click", (e) => {
      e.stopPropagation();
      li.querySelector(".menu-content").style.display = "block";
    });
    taskList.appendChild(li);
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  renderTasks(currentFilter);
}

function editTask(index) {
  const newText = prompt("Edit text:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    renderTasks(currentFilter);
  }
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks(currentFilter);
}

clearAllBtn.addEventListener("click", () => {
  tasks = [];
  renderTasks();
});

allTab.onclick = () => {
  currentFilter = "all";
  setActive(allTab);
  renderTasks();
};

pendingTab.onclick = () => {
  currentFilter = "pending";
  setActive(pendingTab);
  renderTasks("pending");
};

completedTab.onclick = () => {
  currentFilter = "completed";
  setActive(completedTab);
  renderTasks("completed");
};

function setActive(el) {
  document
    .querySelectorAll(".tabs span")
    .forEach((span) => span.classList.remove("active"));
  el.classList.add("active");
}

document.addEventListener("click", () => {
  document
    .querySelectorAll(".menu-content")
    .forEach((menu) => (menu.style.display = "none"));
});
