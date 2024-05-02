document.addEventListener("DOMContentLoaded", function() {
    const inputField = document.getElementById("taskInput");
    const addButton = document.getElementById("addButton");
    const todoList = document.getElementById("list-container");

    // Load tasks from localStorage when the page loads
    loadTasks();

    // Add task to the list
    addButton.addEventListener("click", function() {
        const taskText = inputField.value.trim();
        if (taskText !== "") {
            addTask(taskText, false); // Mark task as incomplete initially
            saveTasks(); // Save tasks to localStorage
            inputField.value = "";
        }
    });

    // Function to add task
    function addTask(taskText, isCompleted) {
        const listItem = document.createElement("li");
        listItem.textContent = taskText;
        if (isCompleted) {
            listItem.classList.add("checked");
        }

        listItem.addEventListener("click", function() {
            listItem.classList.toggle("checked");
            saveTasks(); // Save tasks to localStorage
        });

        // Add a delete button to each task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "❌";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation(); // Prevent the task from being toggled
            deleteTask(listItem);
            saveTasks(); // Save tasks to localStorage
        });

        listItem.appendChild(deleteButton);
        todoList.appendChild(listItem);
    }

    // Function to delete task
    function deleteTask(task) {
        task.remove();
    }

    // Function to save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        const listItems = document.querySelectorAll("#list-container li");
        listItems.forEach(item => {
            tasks.push({
                text: item.textContent,
                isCompleted: item.classList.contains("checked")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to load tasks from localStorage
    function loadTasks() {
        todoList.innerHTML = ""; // Clear existing tasks
        const savedTasks = JSON.parse(localStorage.getItem("tasks"));
        if (savedTasks) {
            savedTasks.forEach(task => {
                addTask(task.text, task.isCompleted);
            });
        }
    }
});
