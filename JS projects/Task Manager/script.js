const tasks = [];

function addTask() {
    const title = document.getElementById('task-title').value;
    const description = document.getElementById('task-description').value;

    if (title) {
        const task = { title, description, completed: false };
        tasks.push(task);
        displayTasks();
        document.getElementById('task-title').value = '';
        document.getElementById('task-description').value = '';
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('tasks');
    taskList.innerHTML = '';

    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.title}: ${task.description}</span>
            <button onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

displayTasks();
