import confetti from "canvas-confetti";

export function addTodo() {
  const msgError = document.querySelector(".error");
  try {
    const inputTodos = document.querySelector("#inputTodo");
    let task = inputTodos.value.trim();
    if (task === "") {
      throw new Error("Veuillez entrer une tâche!!!");
    }
    saveLocalStorageTodo(task);
    createTodoElements(task);
    complitedTask();
    deletTask();
    confetti();
    msgError.innerText = "";
    inputTodos.value = "";
  } catch (error) {
    msgError.textContent = error.message;
  }
}

function displayHours() {
  let currentHours = new Date();
  let heure = currentHours.getHours();
  let minute = currentHours.getMinutes();
  return `${heure < 10 ? "0" + heure : heure}:${
    minute < 10 ? "0" + minute : minute
  }`;
}

function createTodoElements(task) {
  const boxTodos = document.querySelector(".box-todo");
  let boxlist = document.createElement("li");
  boxlist.classList.toggle("list-li");

  boxlist.innerHTML += `
        
          <input type="checkbox" />
          <p>${task}</p>
          <span>${displayHours()}</span>
          <button class="btn-delete"><i class="fa-solid fa-trash"></i></button>
    
          `;

  const ulElement = document.querySelector(".list-el");
  ulElement.appendChild(boxlist);
  boxTodos.appendChild(ulElement);
}

export function deletTask() {
  const btnDelete = document.querySelectorAll(".btn-delete");
  btnDelete.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let selectTask = e.target;
      selectTask.parentElement.classList.add("trash-task");
      selectTask.parentElement.addEventListener("animationend", () => {
        selectTask.parentElement.remove();
      });

      deleteLocalStorageTodo(
        selectTask.previousElementSibling.previousElementSibling.innerText
      );
    });
  });
}

function complitedTask() {
  let checkTask = document.querySelectorAll("input[type=checkbox]");
  checkTask.forEach((check) => {
    check.addEventListener("change", (e) => {
      let btnChecked = e.target.checked;
      if (btnChecked) {
        e.target.nextElementSibling.style.textDecoration = "line-through";
        e.target.parentElement.style.opacity = "0.3";
      } else {
        e.target.nextElementSibling.style.textDecoration = "none";
        e.target.parentElement.style.opacity = "1";
      }
    });
  });
}

function saveLocalStorageTodo(todo) {
  let todos;
  let todosItem = localStorage.getItem("todo");

  if (todosItem === null) {
    todos = [];
  } else {
    todos = JSON.parse(todosItem);
  }
  todos.push(todo);
  localStorage.setItem("todo", JSON.stringify(todos));
}

export function showLocalStorageTodo() {
  let todos;
  let todosItem = localStorage.getItem("todo");

  if (todosItem === null) {
    todos = [];
  } else {
    todos = JSON.parse(todosItem);
  }
  todos.forEach((el) => {
    createTodoElements(el);
  });
  complitedTask();
  deletTask();
}

function deleteLocalStorageTodo(todo) {
  let todos;
  let todosItem = localStorage.getItem("todo");

  if (todosItem === null) {
    todos = [];
  } else {
    todos = JSON.parse(todosItem);
  }
  let indexTodo = todos.indexOf(todo);
  if (indexTodo === -1) {
    return;
  }

  todos.splice(indexTodo, 1);
  localStorage.setItem("todo", JSON.stringify(todos));
}
