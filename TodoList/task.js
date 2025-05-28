const taskManager = {
  tasks: [],
  currentId: 1,

  load() {
    const stored = JSON.parse(localStorage.getItem('taskData'));
    if (stored) {
      this.tasks = stored.tasks || [];
      this.currentId = stored.currentId || 1;
    }
  },

  save() {
    localStorage.setItem('taskData', JSON.stringify({
      tasks: this.tasks,
      currentId: this.currentId
    }));
  },

  addTask(title, description, priority) {
    if (!title || !description || isNaN(priority)) {
      throw new Error("Date invalide pentru sarcină.");
    }

    const task = {
      id: this.currentId++,
      title,
      description,
      priority: +priority,
      completed: false
    };

    this.tasks.push(task);
    this.save();
  },

  completeTask(id) {
    const task = this.tasks.find(t => t.id === id);
    if (task) {
      task.completed = true;
      this.save();
    }
  },

  deleteTask(id) {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks.splice(index, 1);
      this.save();
    }
  },

  completionPercentage() {
    if (this.tasks.length === 0) return 0;
    const completed = this.tasks.filter(t => t.completed).length;
    return Math.round((completed / this.tasks.length) * 100);
  }
};

const form = document.getElementById('taskForm');
const list = document.getElementById('taskList');
const completionSpan = document.getElementById('completion');
const sortBtn = document.getElementById('sortBtn');

let sortByPriority = false;

function updateUI() {
  list.innerHTML = '';

  const tasksToShow = sortByPriority
    ? [...taskManager.tasks].sort((a, b) => a.priority - b.priority)
    : taskManager.tasks;

  tasksToShow.forEach(task => {
    const li = document.createElement('li');

    const info = document.createElement('div');
    info.className = 'task-info';
    info.innerHTML = `<strong>${task.title}</strong><br>${task.description}<br>Prioritate: ${task.priority}`;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const completeBtn = document.createElement('button');
    completeBtn.textContent = 'Finalizat';
    completeBtn.onclick = () => {
      taskManager.completeTask(task.id);
      updateUI();
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Șterge';
    deleteBtn.onclick = () => {
      taskManager.deleteTask(task.id);
      updateUI();
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);

    if (task.completed) {
      li.style.borderLeftColor = 'green';
      li.style.opacity = '0.7';
    }

    list.appendChild(li);
  });

  completionSpan.textContent = taskManager.completionPercentage() + '%';
}

// Form submission
form.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('title').value.trim();
  const description = document.getElementById('description').value.trim();
  const priority = document.getElementById('priority').value;

  try {
    taskManager.addTask(title, description, priority);
    form.reset();
    updateUI();
  } catch (err) {
    alert(err.message);
  }
});

// Sort button
sortBtn.addEventListener('click', () => {
  sortByPriority = !sortByPriority;
  sortBtn.textContent = sortByPriority
    ? 'Anulează sortarea după prioritate'
    : 'Sortează după prioritate';
  updateUI();
});

// Inițializare
taskManager.load();
updateUI();
