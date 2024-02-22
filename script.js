let taskIdCounter = 0;
let tasksArray = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskQuantity = document.getElementById("taskQuantity");

    if (taskInput.value.trim() !== "") {
        const taskId = "task" + taskIdCounter++;
        const taskDescription = taskInput.value.trim();
        const quantity = taskQuantity.value;

        const taskItem = {
            id: taskId,
            description: taskDescription,
            quantity: quantity,
            done: false
        };

        tasksArray.push(taskItem);
        updateDOM();

        taskInput.value = "";
        taskQuantity.value = 1;

        showMessage("Opgave tilføjet!", "success");
    } else {
        showMessage("Du skal indtaste en opgave.", "error");
    }
}

function deleteTask(taskId) {
    tasksArray = tasksArray.filter(task => task.id !== taskId);
    updateDOM();

    
    showMessage("Opgave slettet!", "success");
}

function toggleDone(taskId) {
    const taskIndex = tasksArray.findIndex(task => task.id === taskId);

    if (taskIndex !== -1) {
        tasksArray[taskIndex].done = !tasksArray[taskIndex].done;
        updateDOM();

       
        showMessage("Opgave markeret som udført!", "success");
    }
}

function showMessage(message, type) {
    const feedbackMessage = document.getElementById("feedbackMessage");

    
    
    feedbackMessage.innerText = message;
    feedbackMessage.className = type;

    setTimeout(() => {
        feedbackMessage.innerText = "";
        feedbackMessage.className = "";
    }, 2500);
}

function updateDOM() {
    const taskList = document.getElementById("taskList");
    const doneList = document.getElementById("doneList");

    taskList.innerHTML = "";
    doneList.innerHTML = "";

    tasksArray.forEach(task => {
        const taskItem = document.createElement("li");
        taskItem.innerHTML = `
            <input type="checkbox" id="${task.id}" class="checkbox" ${task.done ? 'checked' : ''} onclick="toggleDone('${task.id}')">
            <label for="${task.id}">${task.description} (Antal: ${task.quantity})</label>
            <button onclick="deleteTask('${task.id}')">Slet</button>
        `;

        if (task.done) {
            doneList.appendChild(taskItem);
        } else {
            taskList.appendChild(taskItem);
        }

        taskItem.classList.add('fade-in', 'active');
        setTimeout(() => {
            taskItem.classList.remove('fade-in');
        }, 1500);
    });
}

document.addEventListener("keydown", function(event) {
    const taskInput = document.getElementById("taskInput");
    const taskQuantity = document.getElementById("taskQuantity");

    if (event.key === "Enter" && (document.activeElement === taskInput || document.activeElement === taskQuantity)) {
        addTask();
    }
});
