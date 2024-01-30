document.addEventListener('DOMContentLoaded', function () {
    const taskInput = document.getElementById('task-input');
    const addBtn = document.getElementById('add-btn');
    const tasksList = document.getElementById('tasks');

    addBtn.addEventListener('click', function () {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    taskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask(taskInput.value.trim());
            taskInput.value = '';
        }
    });

    function addTask(taskText) {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${taskText}</span>
            <button class="delete-btn">Delete</button>
        `;
        tasksList.appendChild(li);

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            tasksList.removeChild(li);
        });

      //  const editBtn = li.querySelector('.edit-btn');
      //  editBtn.addEventListener('click', function () {
      //      tasksList.editChild(li);
      //  });
    }
});


