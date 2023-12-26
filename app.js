import "./main.scss";

import { addTodo, showLocalStorageTodo } from "./function.js";

const btnValid = document.querySelector("#btnValid");
const inputTodos = document.querySelector("#inputTodo");

btnValid.addEventListener("click", addTodo);

inputTodos.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    addTodo();
  }
});

document.addEventListener("DOMContentLoaded", showLocalStorageTodo);
