import {
  createItem,
  updateItem,
  retrieveItem,
  deleteItem,
  listItems
} from "./crud";

class Todo {
  constructor({ id, title, completed = false, isEditing = false }) {
    this.id = id;
    this.title = title;
    this.completed = completed;
    this.isEditing = isEditing;
  }

  //ok
  static async list() {
    let tasks = await listItems();
    return tasks;
  }

  //ok
  static create(data) {
    const todo = {
      id: this.id,
      title: data,
      completed: false
    };
    return createItem(todo);
  }

  retrieve() {
    return retrieveItem(this.id);
  }

  update() {
    const todo = {
      id: this.id,
      title: this.title,
      completed: this.completed ? false : true
    };

    return updateItem(this.id, todo);
  }

  async delete() {
    let del = await deleteItem(this.id);
    return del;
  }

  toggleIsEditing() {
    return retrieveItem(this.id);
  }

  // isEditing(){
  //   return;
  // }
  update2(data) {
    const todo = {
      id: this.id,
      title: data,
      completed: this.completed
    };
    return updateItem(this.id, todo);
  }

  toggleIsDeleting() {
    return {};
  }
}

export default Todo;

// Todo.list()
