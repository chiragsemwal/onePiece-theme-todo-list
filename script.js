document.addEventListener("DOMContentLoaded", () => {
  const inputText = document.querySelector("#todo-input");
  const addTaskBtn = document.querySelector("#addTask-btn");
  const taskList = document.querySelector("#todo-list-ul");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => renderTask(task));

  addTaskBtn.addEventListener("click", () => {
    const taskSubmitted = inputText.value.trim();
    if (taskSubmitted === "") return;

    const newTask = {
      id: Date.now(),
      text: taskSubmitted,
      isCompleted: false,
    };

    tasks.push(newTask);
    inputText.value = "";
    saveTask();
    renderTask(newTask);
    console.log(tasks);
  });

  function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.isCompleted) li.classList.add("completed");
    li.innerHTML = `

      <span>${task.text}</span>
    <button>Delete</button>

    `;

    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") return;
      task.isCompleted = !task.isCompleted;
      li.classList.toggle("completed");
      saveTask();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation();
      tasks = tasks.filter((t) => t.id === task.id);
      li.remove();
      saveTask();
    });

    taskList.appendChild(li);
  }

  function saveTask() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
