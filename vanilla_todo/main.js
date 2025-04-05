document.addEventListener("DOMContentLoaded", () => {
  let tasks = [];
  const input = document.querySelector("#task_input");
  const submitButton = document.querySelector("#submit_button");
  const mainTaskList = document.querySelector("#list");

  submitButton.addEventListener("click", () => {
    const taskItem = input.value;
    tasks.push({ description: taskItem, status: "NEW" });
    renderList(tasks);
  });

  function renderList(taskList) {
    const ul = document.createElement("ul");

    mainTaskList.innerHTML = "";

    taskList.forEach((item, index) => {
      if (item.status !== "COMPLETED") {
        const li = document.createElement("li");
        const completeButton = document.createElement("button");

        completeButton.textContent = "Mark as done!";
        completeButton.classList.add("complete-btn");
        completeButton.dataset.taskId = index;

        li.textContent = item.description;

        li.dataset.taskId = index;
        ul.appendChild(li);
        ul.appendChild(completeButton);
      }
    });

    ul.addEventListener("click", (event) => {
      if (event.target.classList.contains("complete-btn")) {
        const taskId = parseInt(event.target.dataset.taskId, 10);
        if (window.confirm("Are you sure you want to delete this task!")) {
          completeTask(taskId);
        }
      }
    });
    mainTaskList.appendChild(ul);
  }

  function deleteTask(taskId) {
    const newTask = [...tasks].filter((_, index) => index !== taskId);
    tasks = [...newTask];

    renderList(tasks);
  }

  function completeTask(taskId) {
    const completedTask = tasks[taskId];
    tasks[taskId] = {
      description: completedTask.description,
      status: "COMPLETED",
    };

    console.log("Hello new list", tasks);
    renderList(tasks);
  }
});
