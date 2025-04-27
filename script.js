// Get elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Add task function
addTaskBtn.addEventListener('click', function() {
    const taskText = taskInput.value;
    
    if (taskText === '') {
        alert('Please enter a task!');
        return;
    }

    // Create task element
    const taskItem = document.createElement('li');
    taskItem.innerHTML = `
        <span>${taskText}</span>
        <button class="deleteBtn">Delete</button>
    `;
    
    // Add delete functionality
    taskItem.querySelector('.deleteBtn').addEventListener('click', function() {
        taskItem.remove();
    });

    // Append task to the list
    taskList.appendChild(taskItem);
    
    // Clear input field
    taskInput.value = '';
});
