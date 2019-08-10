document.addEventListener('DOMContentLoaded', function () {
    //Obiekt todo
    var Todo = function (id, element, todoHeader, deleteBtn, completeBtn, priority) {
        this.id = id,
            this.priority = priority,
            this.completed = false,
            this.element = element,
            this.todoHeader = todoHeader,
            this.deleteBtn = deleteBtn,
            this.completeBtn = completeBtn
    }

    //Funkcje
    var renderTodos = function (todosArr, destination) {
        destination.innerHTML = ""
        taskPriority.value = 5;
        todosArr = todosArr.sort((a, b) => {
            return b.priority - a.priority
        })

        todosArr.forEach(todo => {
            destination.appendChild(todo.element)
        })
    }

    var todosToDoCounter = function (todosArr, destination) {
        var counter = 0
        todosArr.forEach((todo) => {
            if (!todo.completed) {
                counter++
            }
        })
        destination.innerText = counter
    }

    //Pobieranie elementów
    var addTaskButton = document.querySelector('#addTaskButton')
    addTaskButton.style.marginRight = '20px'
    var removeFinishedTasksButton = document.querySelector('#removeFinishedTasksButton')
    var taskInput = document.querySelector('#taskInput')
    var taskList = document.querySelector('#taskList')
    var taskPriority = document.querySelector('#taskPriority')
    taskPriority.style.textAlign = "center"
    var counterEl = document.querySelector('#counter')

    //Zmienne
    var todos = []
    var id = 100;

    todosToDoCounter(todos, counterEl)

    // Zdarzenia
    addTaskButton.addEventListener('click', function () {

        var todoText = taskInput.value

        if (todoText.length <= 5 || todoText.length > 100) {
            return
        }

        //tworzenie elementu do przechowania todo
        var todoEl = document.createElement('li')
        todoEl.dataset.id = id;
        todoEl.classList.add('container')

        var todoHeader = document.createElement('h1')
        todoHeader.innerText = todoText
        todoHeader.dataset.id = id
        todoHeader.setAttribute('contenteditable', true)
        todoHeader.classList.add('h1')

        var deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'Delete'
        deleteBtn.dataset.id = id
        deleteBtn.dataset.type = 'delete'
        deleteBtn.classList.add('btn')
        deleteBtn.classList.add('btn-warning')
        deleteBtn.addEventListener('click', function () {
            var that = this
            todos = todos.filter((todo) => {
                return todo.id !== Number(that.dataset.id)
            })
            todosToDoCounter(todos, counterEl)
            renderTodos(todos, taskList)
        })

        var completeBtn = document.createElement('button')
        completeBtn.innerText = 'Complete'
        completeBtn.dataset.id = id
        completeBtn.dataset.type = 'complete'
        completeBtn.classList.add('btn')
        completeBtn.classList.add('btn-info')
        completeBtn.style.marginLeft = '20px'
        completeBtn.addEventListener('click', function () {
            var that = this
            var completeItem = todos.find(todo => {
                return todo.id === Number(that.dataset.id)
            })
            completeItem.todoHeader.classList.toggle('done')
            completeItem.completed = !completeItem.completed
            todosToDoCounter(todos, counterEl)
        })

        todoEl.appendChild(todoHeader)
        todoEl.appendChild(deleteBtn)
        todoEl.appendChild(completeBtn)

        //Obiekt todo
        var todo = new Todo(id, todoEl, todoHeader, deleteBtn, completeBtn, taskPriority.value)
        //dodanie todo to tablicy
        todos.push(todo)

        renderTodos(todos, taskList)
        todosToDoCounter(todos, counterEl)
        id++
        taskInput.value = ''
    })

    removeFinishedTasksButton.addEventListener('click', function () {
        todos = todos.filter((todo) => {
            return !todo.completed
        })
        renderTodos(todos, taskList)
    })
})