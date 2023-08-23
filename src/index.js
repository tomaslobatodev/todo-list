const input = document.querySelector('#newtaskinput')
const addTaskBtn = document.querySelector('#addtask')
const tasklist = document.querySelector('#tasklist')

let tasks = []

class Task {
    constructor(title, description) {
        this.title = title
        this.desc = description
        this.id = tasks.length + 1
        this.value = false
    }
}

function loadTasks() {
    tasklist.innerHTML = '';

    tasks.forEach(task => {
        const taskElement = document.createElement('div')
        taskElement.classList.add('task');
        taskElement.innerHTML = `
        <div id='${task.id}-toggle' class='side'>
            ${task.value ? `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-square"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" /></svg>
            ` : `
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-square"><rect width="18" height="18" x="3" y="3" rx="2" /></svg>
            `}
           <span class='${task.value ? 'checked' : ''}'>${task.title}</span>
        </div>
        <button class='delete' id='${task.id}-delete'>delete</button>
        `;
        tasklist.appendChild(taskElement)
    });
}

function addTask() {
    const task = new Task(input.value)
    const updatedTasks = [...tasks, task]
    tasks = updatedTasks
    loadTasks()
}

function deleteTask(taskId) {
    const updatedTasks = tasks.filter(task => task.id !== parseInt(taskId))
    tasks = updatedTasks

    loadTasks()
}

function toggleCheck(taskId) {
    const task = tasks.find(task => task.id === taskId)
    deleteTask(taskId)
    if (task.value) task.value = false
    else task.value = true
    const updatedTasks = [...tasks, task]
    tasks = updatedTasks

    loadTasks()
}

addTaskBtn.addEventListener('click', (ev) => {
    ev.preventDefault()
    addTask()
})

document.addEventListener('click', (ev) => {
    if (ev.target.id.includes('delete')) {
        deleteTask(ev.target.id)
    }
})

document.addEventListener('click', (ev) => {
    const sideDiv = ev.target.closest('.side');
    if (sideDiv) {
        const taskId = parseInt(sideDiv.id.split('-')[0]);
        toggleCheck(taskId);
    }
})