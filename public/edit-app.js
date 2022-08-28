
function showTaskData(task) {
    const { _id, task_name, completed } = task
    const taskIdElement = document.getElementById('task-id')
    const taskNameElement = document.getElementById('task-name')
    const taskCompleteElement = document.getElementById('task-complete')

    taskIdElement.placeholder = _id
    taskNameElement.value = task_name
    taskCompleteElement.checked = completed
}

const task = JSON.parse(sessionStorage.getItem('active_task'))
const successAlert = document.getElementById('alert-success')
const dangerAlert = document.getElementById('alert-danger')

if (task) {
    showTaskData(task)

    const applyBtn = document.getElementById('apply-btn')
    applyBtn.addEventListener('click', (e) => {
        e.preventDefault()
        const {_id} = task

        const taskNameElement = document.getElementById('task-name')
        const taskCompleteElement = document.getElementById('task-complete')

        const taskName = taskNameElement.value
        const taskComplete = taskCompleteElement.checked

        task.task_name = taskName
        task.completed = taskComplete

        axios.patch(`http://localhost:5000/api/v1/tasks/${_id}`, task)
            .then(res => {
                const data = res.data.data
                console.log(data)
                if (res.data.success) {
                    dangerAlert.classList.add('d-none')
                    successAlert.classList.remove('d-none')
                }else{
                    throw(res.data.msg)
                }
            })
            .catch((error) => {
                successAlert.classList.add('d-none')
                dangerAlert.classList.remove('d-none')
                console.log(error)
                const msg = Object.values(error.response.data.msg.errors)[0].message
                if(msg){
                    dangerAlert.textContent = msg
                }else{
                    dangerAlert.textContent = 'Failed to updated Task!'
                }
            })
    })
}