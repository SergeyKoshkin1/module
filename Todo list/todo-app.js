(function () {

  let todoArray = [

  ];

  //создаем и возвращаем заголовок приложения
  function createAppTitle(title) {
    let appTitle = document.createElement('h2');
    appTitle.innerHTML = title;
    return appTitle;
  }

  //создаем и возвращаем форму для создания дела
  function createTodoItemForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    let buttonWrapper = document.createElement('div');
    let button = document.createElement('button');

    form.classList.add('input-group', 'mb-3');
    input.classList.add('form-control');
    input.placeholder = 'Введите название нового дела';
    buttonWrapper.classList.add('input-group-append');
    button.classList.add('btn', 'btn-primary');
    button.textContent = 'Добавить дело';
    button.setAttribute('disabled', 'disabled'); // утстанавливает атрибут disabled для кнопки по умолчанию

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    return {
      form,
      input,
      button,
    };

  }

  //создаем и возвращаем список элементов
  function createTodoList() {
    let list = document.createElement('ul');
    list.classList.add('list-group');
    return list;
  }

  function createTodoItem(name) {
    let item = document.createElement('li');
    //кнопки помещаем в один элемент, который красиво покажет их в одной группе
    let buttonGroup = document.createElement('div');
    let doneButton = document.createElement('button');
    let deleteButton = document.createElement('button');

    let idForElemOntodoArrow = Math.random() * 10; //создаем случайное число, для присвоения id каждой задачи
    item.id = idForElemOntodoArrow.toFixed(2); //присваиваем id одновременно округляя на два знака

    //устанавливаем стили для элементов списка, а также для размещения кнопок в правой части с помощью flex
    item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
    item.textContent = name;

    buttonGroup.classList.add('btn-group', 'btn-group', 'btn-group-sm');
    doneButton.classList.add('btn', 'btn-success');
    doneButton.textContent = 'Готово';
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.textContent = 'Удалить';

    //вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    //приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
    return {
      item,
      doneButton,
      deleteButton,
      buttonGroup
    };
  }

  //функция "переключения" отметки о выполнении задачи
  function changeItemDone(arr, item) {
    arr.map(obj => {
      if (obj.id == item.id && obj.done == false) {
        obj.done = true;
      } else if (obj.id == item.id && obj.done == true) {
        obj.done = false;
      }
    });
  }

  //добавляем функцию для обработки нажатия на кнопку "готово"
  function completeTodoItem(item, btn) {
    btn.addEventListener('click', () => {
      todoArray = JSON.parse(localStorage.getItem(key));
      item.classList.toggle('list-group-item-success');
      changeItemDone(todoArray, item);
      localStorage.setItem(key, JSON.stringify(todoArray));
    });
  }

  //добавляем фуннкцию для обработки нажатия на кнопку удалить
  function deleteTodoItem(item, btn) {
    btn.addEventListener('click', () => {
      todoArray = JSON.parse(localStorage.getItem(key));
      let newList = todoArray.filter(obj => obj.id != item.id);
      localStorage.setItem(key, JSON.stringify(newList));
      if (confirm('Вы уверены?')) {
        item.remove();
      }
    });
  }

  function createTodoApp(container, title = 'Список дел', key) {

    let todoAppTitle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    container.append(todoAppTitle);
    container.append(todoItemForm.form);
    container.append(todoList);

    if (localStorage.getItem(key)) {
      todoArray = JSON.parse(localStorage.getItem(key))

      for (let obj of todoArray) {
        let todoItem = createTodoItem(todoItemForm.input.value);
        todoItem.item.textContent = obj.name;
        todoItem.item.id = obj.id;

        if (obj.done == true) {
          todoItem.item.classList.add('list-group-item-success');
        } else {
          todoItem.item.classList.remove('list-group-item-success');
        }

        completeTodoItem(todoItem.item, todoItem.doneButton);
        deleteTodoItem(todoItem.item, todoItem.deleteButton);

        todoList.append(todoItem.item);
        todoItem.item.append(todoItem.buttonGroup);
      }
    }

    //удаляем/возвращаем атрибут disabled по событию input в зависимости от того, пустое поле ввода или нет
    todoItemForm.input.addEventListener('input', function () {
      if (todoItemForm.input.value) {
        todoItemForm.button.removeAttribute('disabled');
      } else {
        todoItemForm.button.setAttribute('disabled', 'disabled');
      }
    })

    //браузер создает событие submit на форме по нажатию на Enter или на кнопку создания дела
    todoItemForm.form.addEventListener('submit', function (e) {
      //эта строчка необходима, чтобы предотвратить стандартное действие браузера
      //в данном случае мы не хотим, чтобы страница перезагружались при отправке формы
      e.preventDefault();

      //игнорируем создание элемента, если пользователь ничего не ввел в поле
      if (!todoItemForm.input.value) {
        return;
      }

      let todoItem = createTodoItem(todoItemForm.input.value);

      completeTodoItem(todoItem.item, todoItem.doneButton);
      deleteTodoItem(todoItem.item, todoItem.deleteButton);

      let localStorageDate = localStorage.getItem(key);

      if (localStorageDate == null) {
        todoArray = [];
      } else {
        todoArray = JSON.parse(localStorageDate);
      }

      //создаем объект для передачи его в массив todoArray, к котором будут хранится все наши дела
      const createItemOjb = (arr) => {
        const itemObj = {
          id: todoItem.item.id, //свойство id, для того, чтобы удалять нужный обьект
          name: todoItemForm.input.value,
          done: false,
        }

        arr.push(itemObj); //записываем элемент в массив todoArray
      }

      createItemOjb(todoArray); //вызываем функцию для создания объекта задачи и записи его в массив дел
      localStorage.setItem(key, JSON.stringify(todoArray)) //записываем массив дел в localStorage

      //создаем и добавляем в список новое дело с названием из поля для ввода
      todoList.append(todoItem.item);

      //обнуляем значение в поле, чтобы не пришлось стирать его вручную
      todoItemForm.input.value = '';

      //возвращаем атрибут disabled кнопке "Добавить дело"
      todoItemForm.button.setAttribute('disabled', 'disabled');
    });

    //заполняем задачами по умолчанию
    if (tasks) {
      for (let item of tasks) {
        let filledTask = createTodoItem(item.name);

        //добавляем обработчика на кнопки
        filledTask.doneButton.addEventListener('click', function () {
          filledTask.item.classList.toggle('list-group-item-success');
        });

        filledTask.deleteButton.addEventListener('click', function () {
          if (confirm('Вы уверены?')) {
            filledTask.item.remove();
          }
        });

        todoList.append(filledTask.item);

        if (item.done) {
          filledTask.item.classList.add('list-group-item-success');
        }
      };
    }

  }

  window.createTodoApp = createTodoApp;

})();
