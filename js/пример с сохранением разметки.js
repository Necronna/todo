const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList')


form.addEventListener('submit', addTask);
tasksList.addEventListener('click', deleteTask);
tasksList.addEventListener('click', doneTask);

if (localStorage.getItem('tasksHTML')) {
    tasksList.innerHTML = localStorage.getItem('tasksHTML');
}

function addTask (event) {
    // Отменяем отправку формы по стандартному поведению
    event.preventDefault();
    
    // Достаем текст задачи из поля ввода
    const taskText = taskInput.value;
    
    // Формируем разметку для нового элемента
    const taskHTML = `<li class="list-group-item d-flex justify-content-between task-item">
                            <span class="task-title">${taskText}</span>
                            <div class="task-item__buttons">
                                <button type="button" data-action="done" class="btn-action">
                                    <img src="./img/tick.svg" alt="Done" width="18" height="18">
                                </button>
                                <button type="button" data-action="delete" class="btn-action">
                                    <img src="./img/cross.svg" alt="Done" width="18" height="18">
                                </button>
                            </div>
                        </li>`;
    
    // Добавляем задачу на страницу
    tasksList.insertAdjacentHTML('beforeend', taskHTML);

    // Очищаем поле ввода и возвращаем на него фокус
    taskInput.value = '';
    taskInput.focus();

    // Если в списке задач более 1 элемента, то мы его скрываем
    if(tasksList.children.length > 1) {
        emptyList.classList.add('none');
    }

    saveHTMLtoLS();
}

function deleteTask(event) {
    // Проверяем если клик был НЕ по кнопке Удалить задачу
    if (event.target.dataset.action !== 'delete') return;

    // Проверяем если клик был по кнопке Удалить задачу
    const parenNode = event.target.closest('.list-group-item');
    parenNode.remove();

    // Если в списке задач более 1 элемента, то мы его скрываем
    if(tasksList.children.length === 1) {
        emptyList.classList.remove('none');
    }
    saveHTMLtoLS();
}        

function doneTask(event) {
    // Проверяем если клик был НЕ по кнопке Задача выполнена
    if (event.target.dataset.action !== 'done') return;

    // Проверяем, что клик был по кнопке Задача выполнена
    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
    saveHTMLtoLS();
}

function saveHTMLtoLS () {
    localStorage.setItem('tasksHTML', tasksList.innerHTML);

}