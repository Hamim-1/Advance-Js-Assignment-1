const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const saveBtn = document.getElementById('save-btn');
const list = document.getElementById('list');
const totalTask = document.getElementById('total-task');
const completedTask = document.getElementById('completed-task');
const pendingTask = document.getElementById('pending-task');

let totalTaskNum = 0;
let completedTaskNum = 0;
let pendingTaskNum = 0;
let editTaskTag;

function task() {
    const dateObj = new Date().getDate();
    const monthObj = new Date().getMonth();
    const date = dateObj > 9 ? dateObj : `0${dateObj}`;
    const month = monthObj > 8 ? monthObj : `0${monthObj + 1}`;
    const div = document.createElement('div');
    div.className = 'w-full flex justify-between';
    div.innerHTML = `
    <h5 class="w-[15%] text-center">${totalTaskNum}</h5>
                <h4 class="w-[35%] text-center" style="text-decoration-color: rgb(15,23,42);text-decoration-thickness: 3px;">${userInput.value}</h4>
                <p class="w-[15%] text-center">${date}/${month}</p>
                <p class="w-[15%] text-center"><input type="checkbox" onclick="completeTask(this)" class="cursor-pointer"></p>
                <div class="material-icons w-[15%] text-center">
                <p class="cursor-pointer w-fit mx-auto" onclick="(deleteTask(this.parentNode.parentNode))">delete</p>
                </div>
                <p class="material-icons w-[5%] text-center cursor-pointer" onclick="(editTask(this.parentNode))">edit</p>
    `;
    return div;
}

function editTask(task) {
    addBtn.style.display = 'none';
    saveBtn.style.display = 'inline-block';
    const taskTag = task.querySelector('h4');
    userInput.value = taskTag.innerText;
    editTaskTag = taskTag;
    userInput.focus();
}

function deleteTask(task) {

    if (editTaskTag === undefined) {

        const checkbox = task.querySelector('p input');

        if (checkbox.checked) {
            completedTaskNum--;
            totalTaskNum--;
            completedTask.innerText = completedTaskNum;
            totalTask.innerText = totalTaskNum;
        } else {
            totalTaskNum--;
            pendingTaskNum--;
            totalTask.innerText = totalTaskNum;
            pendingTask.innerText = pendingTaskNum;
        }
        list.removeChild(task);
        const taskSerial = list.querySelectorAll('div h5');


        taskSerial.forEach((taskNum, index) => {

            taskNum.innerText = index + 1;
        })
    }

}

function completeTask(checkbox) {
    const task = checkbox.parentNode.parentNode.querySelector('h4');

    if (checkbox.checked) {
        completedTaskNum++;
        pendingTaskNum--;
        completedTask.innerText = completedTaskNum;
        pendingTask.innerText = pendingTaskNum;
        task.classList.add('line-through')
    } else {
        completedTaskNum--;
        pendingTaskNum++;
        completedTask.innerText = completedTaskNum;
        pendingTask.innerText = pendingTaskNum;
        task.classList.remove('line-through');
    }
}

function addTask() {
    if (userInput.value.trim().length > 0) {
        totalTaskNum++;
        pendingTaskNum++;
        const newTask = task();
        list.appendChild(newTask);
        userInput.value = '';
        totalTask.innerText = totalTaskNum;
        pendingTask.innerText = pendingTaskNum;

    }
}

function saveTask() {

    if (userInput.value.trim().length > 0) {
        saveBtn.style.display = 'none';
        addBtn.style.display = 'inline-block';
        editTaskTag.innerHTML = userInput.value;
        userInput.value = '';
        editTaskTag = undefined;
    }
}

saveBtn.addEventListener('click', saveTask)

addBtn.addEventListener('click', addTask)
