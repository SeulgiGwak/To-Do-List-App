const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const toggleThemeBtn = document.getElementById('toggleThemeBtn');
const searchInput = document.getElementById('searchInput');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Capitalize each word
function capitalizeWords(str) {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks(filter = "") {
  taskList.innerHTML = '';
  tasks
    .filter(task => task.text.toLowerCase().includes(filter.toLowerCase()))
    .forEach((task, index) => {
      const li = document.createElement('li');
      li.classList.toggle('completed', task.completed);

      li.innerHTML = `
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span class="taskText">${task.text}</span>
        <button class="deleteBtn">Delete</button>
      `;

      // Toggle complete
      li.querySelector('input').addEventListener('change', e => {
        tasks[index].completed = e.target.checked;
        saveTasks();
        renderTasks(searchInput.value);
      });

      // Delete
      li.querySelector('.deleteBtn').addEventListener('click', () => {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks(searchInput.value);
      });

      taskList.appendChild(li);
    });
}

// Add task
function addTask() {
  let taskText = taskInput.value.trim();
  if (taskText === '') {
    alert('Please enter a task!');
    return;
  }

  taskText = capitalizeWords(taskText);
  tasks.push({ text: taskText, completed: false });
  saveTasks();
  renderTasks(searchInput.value);
  taskInput.value = '';
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);

taskInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') addTask();
});

toggleThemeBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
  toggleThemeBtn.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
});

searchInput.addEventListener('input', () => {
  renderTasks(searchInput.value);
});

// Initial render
renderTasks();
