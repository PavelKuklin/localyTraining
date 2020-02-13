const addTask = document.querySelector('.header-button'),
  itemsContainers = document.querySelector('#todo'),
  TodoCompleted = document.querySelector('#completed'),
  toDoTitile = document.querySelector('.header-input'),
  newTitle = toDoTitile.value.trim(),
  removeTask = document.querySelectorAll('.todo-remove'),
  todoItem = document.querySelectorAll('.todo-item'),
  container = document.querySelector('.container');

let data = { // создаем обьект в который все записываем
  toDo: ['Помыть окна'],
  compleate: ['Помыть окна'],
};
const dataUpdateStorage = function () {
  localStorage.removeItem('localData', JSON.stringify(data));
  localStorage.setItem('localData', JSON.stringify(data));
};

const getStart = function () { // функция старт,
  if (JSON.parse(localStorage.getItem('localData'))) {
    data = JSON.parse(localStorage.getItem('localData'));
  }

  console.log(data);

  for (let i = 0; i < data.toDo.length; i++) {
    let newTask = document.createElement('li');
    newTask.classList.add('todo-item');
    newTask.innerHTML = `<span class="todo-title">${data.toDo[i]}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
        </div>`;
    itemsContainers.append(newTask);
  }
  for (let i = 0; i < data.compleate.length; i++) {
    let newTask = document.createElement('li');
    newTask.classList.add('todo-item');
    newTask.innerHTML = `<span class="todo-title">${data.compleate[i]}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
        </div>`;
    TodoCompleted.append(newTask);
  }
};

const geToDotIndex = (index) => { // находим индекс карточки контейнера "в работе"
  let myIndex;
  let items = itemsContainers.querySelectorAll('LI');
  let arrayItems = Array.prototype.slice.call(items);
  if (event.target.parentElement === itemsContainers) {
    myIndex = arrayItems.indexOf(event.target);
  } else if (event.target.parentElement.parentElement === itemsContainers) {
    myIndex = arrayItems.indexOf(event.target.parentElement);
  } else if (event.target.parentElement.parentElement.parentElement === itemsContainers) {
    myIndex = arrayItems.indexOf(event.target.parentElement.parentElement);
  }
  return myIndex;
};

const geCompletedIndex = (index) => { // находим индекс карточки контейнера "закончен"

  let myIndex;
  let items = TodoCompleted.querySelectorAll('LI');
  let arrayItems = Array.prototype.slice.call(items);
  if (event.target.parentElement === TodoCompleted) {
    myIndex = arrayItems.indexOf(event.target);
  } else if (event.target.parentElement.parentElement === TodoCompleted) {
    myIndex = arrayItems.indexOf(event.target.parentElement);
  } else if (event.target.parentElement.parentElement.parentElement === TodoCompleted) {
    myIndex = arrayItems.indexOf(event.target.parentElement.parentElement);
  }
  return myIndex;
};


const addNewTask = (event) => {
  if (event.type === 'click' || event.key === 'Enter') {
    event.preventDefault();
    let newTitle = toDoTitile.value.trim();
    if (newTitle !== '') {
      let newTask = document.createElement('li');
      newTask.classList.add('todo-item');
      newTask.innerHTML = `<span class="todo-title">${newTitle}</span>
				<div class="todo-buttons">
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
        </div>`;
      itemsContainers.append(newTask);
      toDoTitile.style.border = 'none';
      data.toDo.push(newTitle);
      dataUpdateStorage();

    } else {
      toDoTitile.style.border = '1px solid red';
    }
  }
};

const removeThisTask = (event) => {
  const completed = geCompletedIndex();
  const doing = geToDotIndex();
  //$AV_ASW
  if (completed >= 0 && event.target.className === 'todo-remove') {
    let newCompleted = [];
    for (let i = 0; i < data.compleate.length; i++) {
      if (i != completed) {
        newCompleted.push(data.compleate[i]);
      }
    }
    data.compleate = newCompleted;
    dataUpdateStorage();
  } else if (doing >= 0 && event.target.className === 'todo-remove') {
    let newDoing = [];
    for (let i = 0; i < data.toDo.length; i++) {
      if (i != doing) {
        newDoing.push(data.toDo[i]);
      }
    }
    data.toDo = newDoing;
    dataUpdateStorage();
  }
  //$AV_ASW
  if (event.target.className === 'todo-remove') {
    let thisTarget = event.target;
    thisTarget.parentElement.parentElement.remove();

  }
};

const changeTask = (event) => {
  // начало
  const completed = parseFloat(geCompletedIndex());
  const doing = parseFloat(geToDotIndex());
  let myArr = [];
  myArr = [];
  if (event.target.parentElement.parentElement.parentElement === TodoCompleted) {
    data.toDo.push(data.compleate[completed]);
    for (let i = 0; i < data.compleate.length; i++) {
      if (i != completed) {
        myArr.push(data.compleate[i]);
      }
    }
    data.compleate = myArr;
    myArr = [];
    dataUpdateStorage();
  } else if (event.target.parentElement.parentElement.parentElement === itemsContainers) {
    data.compleate.push(data.toDo[doing]);
    for (let i = 0; i < data.toDo.length; i++) {
      if (i != doing) {
        myArr.push(data.toDo[i]);
      }
    }
    data.toDo = myArr;
    myArr = [];
    dataUpdateStorage();
  }
  let parent = event.target.parentElement.parentElement.parentElement;
  if (parent === TodoCompleted) {

    let cloneItem = event.target.parentElement.parentElement.cloneNode(true);
    itemsContainers.append(cloneItem);
    event.target.parentElement.parentElement.remove();
  } else if (parent === itemsContainers) {

    let cloneItem = event.target.parentElement.parentElement.cloneNode(true);
    TodoCompleted.append(cloneItem);
    event.target.parentElement.parentElement.remove();
  }
};

getStart();


itemsContainers.addEventListener('click', (e) => {
  let item = itemsContainers.querySelectorAll('LI');
});
itemsContainers.addEventListener('click', geToDotIndex);
TodoCompleted.addEventListener('click', geCompletedIndex);
addTask.addEventListener('click', addNewTask);
document.addEventListener('keypress', addNewTask);
container.addEventListener('click', removeThisTask);
container.addEventListener('click', changeTask);


