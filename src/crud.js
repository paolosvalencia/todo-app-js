const BASE_URL = "https://mqf9hi.sse.codesandbox.io/todos";

// ok but only responds to the list in the
export async function listItems() {
  let request = new Request(BASE_URL);
  const response = await fetch(request);
  const todo = await response.json();
  return todo;
}

// ok
export async function retrieveItem(id) {
  let request = new Request(`${BASE_URL}/${id}`);
  const response = await fetch(request);
  const todo = await response.json();
  // console.log(todo);
  return todo;
}

// ok
export async function createItem(data) {
  const newtask = await fetch(BASE_URL, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const response = newtask;
  const todo = await response.json();

  return todo;
}

export async function updateItem(id, data) {
  const updateTask = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(
      // title: data /* OR data.title, depends on what will be passed on todo)*/,
      // completed: true
      data
    ),
    headers: {
      "Content-Type": "application/json"
    }
  });

  const response = updateTask;
  const todo = await response.json();
  // console.log(todo)
  return todo;
}

// ok but same with create item
export async function deleteItem(id) {
  const deleteTask = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
  return deleteTask;
}

// updateItem(2, "Creation of JS Node")
