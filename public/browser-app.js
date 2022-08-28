const formDOM = document.getElementById('new-task-form')
const inputDOM = document.getElementById('new-task-input')
const tasksParent = document.getElementById('tasks-parent')

function getTaskElement(task) {
    const {task_name, completed} = task
    let li = document.createElement('li')
    li.classList = ['list-group-item d-flex align-items-center justify-content-between border-0 w-100 my-3']
    li.innerHTML = 
    `<i class="bi bi-circle"></i>
    <label class="ms-3 fw-semibold fs-5 flex-grow-1">${task_name}</label>
    <div class="ms-auto">
        <button id="edit-btn" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></button>
        <button id="delete-btn" class="btn btn-danger btn-sm"><i class="bi bi-trash-fill"></i></button>
    </div>
    `

    if(completed){
        li.innerHTML = 
        `<i class="bi bi-check-circle"></i>
        <label class="ms-3 fw-semibold fs-5 flex-grow-1 text-decoration-line-through">${task_name}</label>
        <div class="ms-auto">
            <button id="edit-btn" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></button>
            <button id="delete-btn" class="btn btn-danger btn-sm"><i class="bi bi-trash-fill"></i></button>
        </div>
        `
    }

    return li
}

function addOneTask(task){
    const taskElement = getTaskElement(task)

    taskElement.querySelector('#delete-btn').addEventListener('click',() => {
        deleteTask(task)
    })

    taskElement.querySelector('#edit-btn').addEventListener('click',() => {
        sessionStorage.setItem('active_task', JSON.stringify(task))
        window.location.href = "edit.html"
    })

    tasksParent.append(taskElement)
}

function hideAllTasks() {
    tasksParent.innerHTML = ''
}

function showAllTasks(tasks) {
    tasks.forEach((task) => {
        addOneTask(task)
    })
}

function getAllTasks() {
    axios.get('/api/v1/tasks')
        .then(res => {
            const data = res.data.data
            if (res.data.success) {
                hideAllTasks()
                showAllTasks(data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

function createTask(){
    const body = {
        task_name: inputDOM.value
    }

    axios.post('/api/v1/tasks', body)
        .then(res => {
            const data = res.data.data
            if (res.data.success) {
                addOneTask(data)
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

function deleteTask(task){
    const {_id} = task
    axios.delete(`/api/v1/tasks/${_id}`)
        .then(res => {
            const data = res.data.data
            if (res.data.success) {
                getAllTasks()
            }
        })
        .catch((error) => {
            console.log(error)
        })
}

if(formDOM){
    formDOM.addEventListener('submit', async (e) => {
        e.preventDefault();
        createTask()
    })
}

getAllTasks()