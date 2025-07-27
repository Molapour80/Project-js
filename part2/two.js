document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    let todos = [];

    // Load todos from localStorage
    if (localStorage.getItem('todos')) {
        todos = JSON.parse(localStorage.getItem('todos'));
        renderTodos();
    }

    // Add new todo
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const todoText = todoInput.value.trim();
        if (todoText !== '') {
            const newTodo = {
                id: Date.now(),
                text: todoText,
                completed: false
            };
            
            todos.push(newTodo);
            saveTodos();
            renderTodos();
            todoInput.value = '';
        }
    });

    // Render todos
    function renderTodos() {
        todoList.innerHTML = '';
        
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.dataset.id = todo.id;

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', toggleTodo);
            
            const span = document.createElement('span');
            span.className = 'todo-text';
            span.textContent = todo.text;
            if (todo.completed) {
                span.classList.add('completed');
            }
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', deleteTodo);
            
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);
            
            todoList.appendChild(li);
        });
    }

    // Toggle todo completion
    function toggleTodo(e) {
        const todoId = parseInt(e.target.parentElement.dataset.id);
        const todoIndex = todos.findIndex(todo => todo.id === todoId);
        
        if (todoIndex !== -1) {
            todos[todoIndex].completed = e.target.checked;
            saveTodos();
            renderTodos();
        }
    }

    // Delete todo
    function deleteTodo(e) {
        const todoId = parseInt(e.target.parentElement.dataset.id);
        todos = todos.filter(todo => todo.id !== todoId);
        saveTodos();
        renderTodos();
    }

    // Save to localStorage
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }
});