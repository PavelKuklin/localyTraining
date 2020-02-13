//Form и input для получения данных
const form = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');// ввод текста

//родительские элементы нужно сделать и сделано
const completedCont = document.getElementById('completed'); // список сделанных
const todoCont = document.getElementById('todo'); // что нужно сделать 


let data = {
    todo: [],
    completed: []
};


// проверка LocalStorage на наличие данных
if (localStorage.getItem('localData')) {
    console.log(data);
    console.log(localStorage.getItem('localData'))
    data = JSON.parse(localStorage.getItem('localData'));
    console.log(data);
}

//addRemoveCards
form.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value !== '') {
        addItem(headerInput.value.trim());
        data.todo.push(headerInput.value.trim()); // отправка данных
        dataUpdateStorage(); // обновление Storage
        headerInput.value = '';
    }
})

const addItem = function (text, completed = false) {
    // создаем элементы    
    const item = document.createElement('li');
    const btnBlock = document.createElement('div');
    const btnRemove = document.createElement('button');
    const btnComplete = document.createElement('button');

    //добавляем классы
    item.classList.add('todo-item');
    btnBlock.classList.add('todo-buttons');
    btnRemove.classList.add('todo-remove');
    btnComplete.classList.add('todo-complete');

    //делаем структуру элементов и добавляем текст
    item.textContent = text;
    btnBlock.appendChild(btnRemove);
    btnBlock.appendChild(btnComplete);
    item.appendChild(btnBlock);

    //обработчики кнопок которые вызывают нужные функций 

    btnRemove.addEventListener('click', function (event) {
        itemRemove(event.target);
    });

    btnComplete.addEventListener('click', function (event) {
        itemComplete(event.target);
    });

    //Этот пункт нужен для того чтобы когда мы открываем страницу 
    //показывать нужные карточки в нужных местах
    let list;
    if (completed) {
        list = completedCont;
    } else {
        list = todoCont;
    }
    // помещаем созданный блок item в блок todoCont перед первым(индекс[0]) "ребенком" блока 
    list.insertBefore(item, list.childNodes[0]);
}


//функций который вызываются после нажатия на кнопки 

//удаление со страницы 
const itemRemove = function (elem) {
    const item = elem.parentNode.parentNode;
    const itemParent = item.parentNode;
    const id = itemParent.id; //получаем id родителя чтобы корректно удалить элемент с объекта data
    const text = item.textContent;

    itemParent.removeChild(item);

    writeToDataObj(id, text);
};


// задание сделано (Переход в блок completed)
const itemComplete = function (elem) {
    const item = elem.parentNode.parentNode;
    const itemParent = item.parentNode;
    const id = itemParent.id; //получаем id родителя чтобы корректно удалить элемент с объекта data
    const text = item.textContent;

    //здесь мы к переменной target присвоим значение родителя чтобы добавить
    let target;
    if (id === 'todo') {
        target = completedCont; //то что сделано 
    } else {
        target = todoCont; // нужно сделать
    }

    itemParent.removeChild(item);
    target.insertBefore(item, target.childNodes[0]);

    writeToDataObj(id, text, true); //запись данных в data

};

const writeToDataObj = function (id, textContent, boolen = false) {
    if (id === 'todo') {
        data.todo.splice(data.todo.indexOf(textContent), 1);//почитать про этот метод 
        boolen == true ? data.completed.push(textContent) : null;
    } else {
        data.completed.splice(data.completed.indexOf(textContent), 1);
        boolen == true ? data.todo.push(textContent) : null;
    }
    dataUpdateStorage();
}

//записывает данные в localStorage
const dataUpdateStorage = function () {
    localStorage.setItem('localData', JSON.stringify(data));
};

//Рэндерит данные 
const renderUpdateItems = function () {

    if (!data.todo && !data.completed) {
        return;
    }

    for (let i = 0; i < data.todo.length; i++) {
        addItem(data.todo[i]);
    }

    for (let i = 0; i < data.completed.length; i++) {
        addItem(data.completed[i], true);
    }
};

renderUpdateItems();