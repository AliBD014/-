 // Save all tasks in localStorage
    function saveTasks() {
      const tasks = [];
      document.querySelectorAll('#taskList li').forEach(li => {
        tasks.push({
          text: li.querySelector('span').textContent,
          priority: li.className
        });
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Create a task <li> element and add it to the list
    function createTaskElement(text, priority) {
      const li = document.createElement('li');
      li.className = priority;

      const span = document.createElement('span');
      span.textContent = text;

      const btnGroup = document.createElement('div');
      btnGroup.className = 'btns';

      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.onclick = () => {
        const newTask = prompt('Edit task:', span.textContent);
        if (newTask !== null) {
          span.textContent = newTask.trim();
          saveTasks();
        }
      };

      const delBtn = document.createElement('button');
      delBtn.textContent = 'Delete';
      delBtn.onclick = () => {
        li.remove();
        saveTasks();
      };

      btnGroup.appendChild(editBtn);
      btnGroup.appendChild(delBtn);

      li.appendChild(span);
      li.appendChild(btnGroup);

      document.getElementById('taskList').appendChild(li);
    }

    // Load tasks from localStorage and recreate them
    function loadTasks() {
      const saved = localStorage.getItem('tasks');
      if (!saved) return;
      const tasks = JSON.parse(saved);
      tasks.forEach(task => {
        createTaskElement(task.text, task.priority);
      });
    }

    function addTask() {
      const taskInput = document.getElementById('taskInput');
      const priority = document.getElementById('prioritySelect').value;
      const taskText = taskInput.value.trim();
      if (taskText === '') return;

      createTaskElement(taskText, priority);
      saveTasks();

      taskInput.value = '';
    }

    // Load saved tasks on page load
    window.onload = loadTasks;