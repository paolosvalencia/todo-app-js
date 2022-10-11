import { listItems } from "./crud";
import Todo from "./Todo";

let todoItems = new Map();

// update todoItems list with the new value
function updateTodoList(todo) {
  todoItems.set(todo.id, new Todo(todo));
  renderList();
}

//ok
async function toggleComplete(item) {
  // TODO: REPLACE THIS WITH YOUR CALL FOR UPDATE METHOD
  const response = await item.update();
  const todo = new Todo(response);

  updateTodoList(todo);
  // renderList()
}

//ok
async function toggleIsEditing(item) {
  // TODO: REPLACE THIS WITH YOUR CALL FOR TOGGLE EDIT METHOD
  const response = await item.toggleIsEditing();
  response.isEditing = item.isEditing ? false : true;

  updateTodoList(response);
}

//ok
async function editTodo(item) {
  // get value from input field
  const inputField = document.getElementById(`item-title-input-${item.id}`);
  if (inputField.value) {
    // TODO: REPLACE THIS WITH YOUR CALL FOR UPDATE METHOD
    const todo = await item.update2(inputField.value);

    updateTodoList(todo);
  } else {
    alert("Title cannot be empty.");
    console.log("run");
  }
}

//ok
async function deleteTodo(item) {
  const confirm = window.confirm(
    `Are you sure you want to delete: ${item.title}`
  );
  if (confirm) {
    // TODO: CALL YOUR DELETE METHOD HERE
    item.delete();

    // remove item from the todo item list
    todoItems.delete(item.id);
    renderList();
  }
}

//ok
async function createTodo() {
  const inputField = document.getElementById("item-title-input-add");
  if (inputField.value) {
    // TODO: REPLACE THIS WITH YOUR CALL FOR CREATE METHOD
    const task = await Todo.create(inputField.value);
    const todo = new Todo(task);

    // clear input field
    updateTodoList(todo);
    inputField.value = "";
  }
}

// Method for building the todo list
function renderList() {
  const output = document.getElementById("todo-list");
  output.innerHTML = "";

  const addButton = document.getElementById("add-todo-btn");
  addButton.onclick = () => createTodo();

  todoItems.forEach((item) => {
    const itemContainer = document.createElement("div");
    itemContainer.className = item.completed ? "todo-item done" : "todo-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.onchange = () => toggleComplete(item);

    if (item.completed) {
      checkbox.checked = true;
    }

    itemContainer.appendChild(checkbox);

    if (item.isEditing) {
      const itemTitle = document.createElement("input");
      itemTitle.id = `item-title-input-${item.id}`;
      itemTitle.type = "text";
      itemTitle.value = item.title;
      itemTitle.className = "item-title";
      itemContainer.appendChild(itemTitle);
    } else {
      const itemTitle = document.createElement("span");
      itemTitle.innerHTML = item.title;
      itemTitle.className = "item-title";
      itemContainer.appendChild(itemTitle);
    }

    const editButton = document.createElement("button");
    editButton.className = "action-button";
    if (item.isEditing) {
      editButton.onclick = () => editTodo(item);
      editButton.innerHTML = "Save";

      const cancelButton = document.createElement("button");
      cancelButton.className = "action-button";
      cancelButton.onclick = () => toggleIsEditing(item);
      cancelButton.innerHTML = "Cancel";

      itemContainer.appendChild(cancelButton);
    } else {
      editButton.onclick = () => toggleIsEditing(item);
      editButton.innerHTML = "Edit";
    }
    itemContainer.appendChild(editButton);

    const deleteButton = document.createElement("button");
    deleteButton.className = "action-button";
    deleteButton.onclick = () => deleteTodo(item);
    deleteButton.innerHTML = "Delete";
    itemContainer.appendChild(deleteButton);

    output.appendChild(itemContainer);
  });
}

//ok
async function populateTodoList() {
  // TODO: REPLACE THIS WITH YOUR CALL FOR LIST METHOD
  const itemList = await Todo.list(); //
  if (itemList) {
    itemList.forEach((item) => {
      const todoItem = new Todo(item);
      todoItems.set(todoItem.id, todoItem);
    });
    renderList();
  }
}

populateTodoList();
