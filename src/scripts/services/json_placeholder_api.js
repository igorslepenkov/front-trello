const JSON_PLACEHOLDER_USERS_URL = "https://jsonplaceholder.typicode.com/users";

async function getAllUsers() {
  const response = await fetch(JSON_PLACEHOLDER_USERS_URL);
  return response.json();
}

async function getUserById(id) {
  const response = await fetch(`${JSON_PLACEHOLDER_USERS_URL}/${id}`);
  return response.json();
}

async function renderSelectUsers(formElement) {
  const select = document.createElement("select");
  const users = await getAllUsers();
  console.log(users);
  for (const user of users) {
    const option = document.createElement("option");
    option.textContent = `${user.name}`;
    option.value = `${user.id}`;
    select.insertAdjacentElement("beforeend", option);
  }
  formElement.insertAdjacentElement("beforeend", select);
}

export { renderSelectUsers, getAllUsers, getUserById };
