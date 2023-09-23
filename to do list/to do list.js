document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to render tasks
    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${task}
                <button class="delete-btn" data-index="${index}">Delete</button>
                <button class="edit-btn" data-index="${index}">Edit</button>
            `;
            taskList.appendChild(li);
        });

        // Add event listeners to delete and edit buttons
        const deleteButtons = document.querySelectorAll(".delete-btn");
        deleteButtons.forEach((button) => {
            button.addEventListener("click", deleteTask);
        });

        const editButtons = document.querySelectorAll(".edit-btn");
        editButtons.forEach((button) => {
            button.addEventListener("click", editTask);
        });

        // Save tasks to local storage
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Add a new task
    addTaskButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push(taskText);
            taskInput.value = "";
            renderTasks();
        }
    });

    // Delete a task
    function deleteTask(event) {
        const index = event.target.getAttribute("data-index");
        tasks.splice(index, 1);
        renderTasks();
    }

    // Edit a task
    function editTask(event) {
        const index = event.target.getAttribute("data-index");
        const updatedTask = prompt("Edit task:", tasks[index]);
        if (updatedTask !== null) {
            tasks[index] = updatedTask;
            renderTasks();
        }
    }

    renderTasks();
});